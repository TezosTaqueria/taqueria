# Updating the Taqueria SmartPy Wrapper script to include handling a JSON object passed in as the second command line argument.

import json
import runpy
import sys
import importlib
import inspect
import smartpy
import os
import shutil

first_run = True  # Flag to ensure `__taq_compile__` only runs once
found_modules = []  # To hold the found SmartPy modules
found_contracts = []  # To hold the instantiated contract instances
output = {}

# Parse sys.argv[1] into a dict pair from JSON string
# sys.argv[1] is a JSON string that looks like this:
# {"sourceFile": "minimal.py", projectDir: "/Users/foo/Projects/taqueria-project", "config": {"contractsDir": "contracts", "artifactsDir": "artifacts"}}
# The JSON string is passed in from the Taqueria plugin as the second command line argument
input = json.loads(sys.argv[2]) if len(sys.argv) > 2 else {}

example_storage_code = """import smartpy as sp
# storage expression variables must contain the word "storage"
default_storage = {
  "count": sp.int(0)
}"""

def log(message):
    if os.environ.get('TAQUERIA_DEBUG', False):
        print(message)

def append_to_output(contractName, storage_expr=None, failed=False):
    source = f"{get_input_contract_relpath()}/{contractName}"
    
    if contractName not in output:
        output[contractName] = {
            "source": source,
            "artifact": f"{contractName}.tz"
        }
        
    if storage_expr is not None:
        output[contractName]["artifact"] += f"\n{contractName}.{storage_expr}.tz"
    
    if failed:
        output[contractName]["artifact"] = "Not Compiled"

def has_output_error(contractName):
    return contractName in output and output[contractName]["artifact"] == "Not Compiled"


def get_input_contract_abspath():
    return os.path.abspath(sys.argv[1])

def get_input_contract_dir():
    return os.path.join(input['projectDir'], input['config']['contractsDir'])

def get_input_artifacts_dir():
    return os.path.join(input['projectDir'], input['config']['artifactsDir'])

def get_input_contract_relpath():
    return get_input_contract_abspath().replace(get_input_contract_dir(), "").lstrip("/")

def get_storage_list_abspath(contractName):
    return os.path.join(get_input_contract_dir(), f"{contractName}.storageList.py")

def get_contracts(module):
    contracts = {}
    for contractName in module.elements.keys():
        if (is_contract_class(module.elements[contractName])):
            contracts[contractName] = getattr(module, contractName)
    return contracts

def get_scenario_output_dir(contractName):
    root = os.environ['SMARTPY_OUTPUT_DIR'] if 'SMARTPY_OUTPUT_DIR' in os.environ else os.path.curdir
    return os.path.join(root, f"Taqueria-{contractName}")

def get_storage_list_module(contractName):
    # Get the absolute path of the storage list file
    storageList_abspath = get_storage_list_abspath(contractName)
    spec = importlib.util.spec_from_file_location(f'{contractName}_storageList', storageList_abspath)
    
    # Create a new module based on the spec
    storage_module = importlib.util.module_from_spec(spec)

    # Monkey-patch the add_test in storage_module's smartpy
    def do_nothing_add_test(*args, **kwargs):
        def wrapper(f):
            return lambda: None
        return wrapper
    storage_module.smartpy = smartpy
    storage_module.sp = smartpy
    storage_module.smartpy.add_test = do_nothing_add_test

    # Monkey-patch the module in storage_module's smartpy
    def do_nothing_module(*args, **kwargs):
        return lambda: None
    storage_module.smartpy.module = do_nothing_module

    # Ensure that the contracts directory is in the path
    sys.path.append(get_input_contract_dir())

    spec.loader.exec_module(storage_module)

    # Now that the module is executed, monkey patch the global smartpy module again
    monkey_patch_module()

    return storage_module

def monkey_patch_add_test():
    smartpy.original_add_test = smartpy.add_test

    def patch_add_test(*args, **kwargs):
        global first_run
        log("This is my Taqueria-customized version of add_test.")
        
        def wrapper(f):
            global first_run
            if first_run:
                first_run = False
                log("Running __taq_compile__")
                __taq_compile__()
            else:
                log(f"Skipping function {f.__name__} because it doesn't start with '__taq__'")
                return lambda: None
        return wrapper
    
    smartpy.add_test = patch_add_test

def monkey_patch_module():
    smartpy.original_module = smartpy.module

    def patch_module(*args, **kwargs):
        log("This is my Taqueria-customized version of module.")
        mod = smartpy.original_module(*args, **kwargs)
        found_modules.append(mod)  # Store the found module
        return mod
    
    smartpy.module = patch_module

def monkey_patch_contract():
    monkey_patch_add_test()
    monkey_patch_module()

def is_contract_class(module_element):
    return module_element[0] == "contractClass"

def get_storage_exprs(storage_module):
    storage_exprs = {}
    for expr in dir(storage_module):
        if expr.__contains__("storage"):
            storage_exprs[expr] = getattr(storage_module, expr)
    return storage_exprs

def does_contract_require_initial_storage(contractName, mod):
    # The module has a sexpr property that looks like this:
    # '((Some ("tests/e2e/data/smartpy-data/minimal.py" 6)) module main ((Some ("tests/e2e/data/smartpy-data/minimal.py" 6)) contract_def MyContract () (((Some ("tests/e2e/data/smartpy-data/minimal.py" 7)) method init () (())) ((Some ("tests/e2e/data/smartpy-data/minimal.py" 11)) method (entrypoint entrypoint_1) () (())))))'
    #
    # We need to extract the substring of the sexpr that starts with "contract_def [contractName]" up till the end of the sexpr or the next "contract_def" substring
    # Then, we need to check if the substring contains "method init ()". If so, the contract does NOT require initial storage and this function returns false. Otherwise, we can assume the contract does require initial storage and this function returns true.
    sexpr = mod.sexpr
    focused_contract_def = f"contract_def {contractName}"
    contract_def_index = sexpr.find(focused_contract_def)+len(focused_contract_def)
    if contract_def_index == -1:
        return False
    else:
        substring = sexpr[contract_def_index:]
        next_contract_def_index = substring.find("contract_def")
        if next_contract_def_index == -1:
            return substring.find("method init ()") == -1
        else:
            return substring[:next_contract_def_index].find("method init ()") == -1

def __taq_compile__():
    log("This is the __taq_compile__ function.")
    
    # Create an empty scenario in SmartPy
    sc = None
    
    # Add all found modules and their contracts to the scenario
    for mod in found_modules:
        contracts = get_contracts(mod)
        for contractName in contracts.keys():
                
                # Create an empty scenario in SmartPy
                if not sc:
                    sc = smartpy.test_scenario(f"Taqueria-{contractName}")
                    sc.add_module(mod)

                # Print the value of key
                log(f"Found contract {contractName}")

                # Get the contract constructor function
                contract_class_func = contracts[contractName]

                # Does this contract require initial storage?
                if does_contract_require_initial_storage(contractName, mod):
                    # Get the storage module
                    try:
                        storage_module = get_storage_list_module(contractName)
                    except:
                        print(f"""Warning: Contract {contractName} requires initial storage to be specified as an expression in the {contractName}.storageList.py file, which cannot be found. Here's an example:\n{example_storage_code}""", file=sys.stderr)
                        append_to_output(contractName, None, True)
                        continue

                    # Get the storage expressions found in the storage list module
                    storage_exprs = get_storage_exprs(storage_module)

                    if len(storage_exprs) > 0:
                        for storage_expr in storage_exprs.keys():
                            if has_output_error(contractName):
                                continue

                            log(f"Found storage expression {storage_expr}")
                            storage_value = storage_exprs[storage_expr]

                            # Try instantiating with initial storage
                            try:
                                contract_instance = contract_class_func(**storage_value)
                                if not contractName in found_contracts:
                                    found_contracts.append(contractName)
                                sc += contract_instance

                                # Add output
                                append_to_output(contractName, storage_expr)
                            except:
                                print(f"""Warning: Contract {contractName} failed to compile using the initial storage expression called {storage_expr}.""", file=sys.stderr)
                                append_to_output(contractName, None, True)
                    else:
                        # Write to stderr a warning that this Contract requires initial storage to be specified as an expression in the [contractName].storageList.py file
                        print(f"""Warning: Contract {contractName} requires initial storage to be specified as an expression in the {contractName}.storageList.py file. Here's an example:\n{example_storage_code}""", file=sys.stderr)
                        append_to_output(contractName, None, True)
                        
                else:
                    # Try instantiating without any initial storage
                    try:
                        contract_instance = contract_class_func()
                        if not contractName in found_contracts:
                                found_contracts.append(contractName)
                        sc += contract_instance
                        
                        # Add output
                        append_to_output(contractName)

                    # If that fails, try instantiating with initial storage
                    except Exception as err:
                        print(f"""Warning: Contract {contractName} failed to compile.""")
                        append_to_output(contractName, None, True)
                        
    log("Done compiling all contracts.")

def get_compiled_contract_filename(dir, json=False):
    for filename in os.listdir(dir):
        if json and filename.endswith("0_contract.json"):
            return os.path.join(dir, filename)
        elif not json and filename.endswith("0_contract.tz"):
            return os.path.join(dir, filename)
    return None

def get_compiled_storage_filename(dir, number):
    for filename in os.listdir(dir):
        if filename.endswith(f"{number}_storage.tz"):
            return os.path.join(dir, filename)
    return None

def move_files():
    for contract_name in found_contracts:

        # Skip moving files if compilation was unsuccessful
        if contract_name not in output or has_output_error(contract_name):
            continue

        contract_dir = os.path.join(get_input_artifacts_dir(), contract_name)
        os.makedirs(contract_dir, exist_ok=True)
        temp_dir = get_scenario_output_dir(contract_name)

        # Move the contract files
        shutil.move(get_compiled_contract_filename(temp_dir, True), os.path.join(contract_dir, f"{contract_name}.json"))
        shutil.move(get_compiled_contract_filename(temp_dir), os.path.join(contract_dir, f"{contract_name}.tz"))

        # Move the storage files
        try:
            storage_list_module = get_storage_list_module(contract_name)
            storage_exprs = get_storage_exprs(storage_list_module)
        except:
            storage_exprs = {}

        for index, storage_expr in enumerate(storage_exprs.keys()):
            shutil.move(get_compiled_storage_filename(temp_dir, index), os.path.join(contract_dir, f"{contract_name}.{storage_expr}.tz"))

        # Remove the temp directory
        shutil.rmtree(temp_dir)

# Run the user's SmartPy script to kick things off
if len(sys.argv) > 1:
    monkey_patch_contract()
    runpy.run_path(sys.argv[1], run_name='__main__')
    move_files()
    print(json.dumps(list(output.values())))

else:
    print("Error: No SmartPy script provided.", file=sys.stderr)
    sys.exit(1)
