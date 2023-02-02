#!/bin/env/zsh
# Copyright (c) 2023 ECAD Labs. All rights reserved.
#
# Run a Taqueria demo: `source taq-demo.sh && demo`
#
# * "Private" commands are prefixed with "_" and are executed silently
# * "Public" commands are written to stdout and await an action (such as (o)k)
#
# See the README for more details.
#
EXPECTED_TAQ_VERSION='v0.28.0'
SCRIPT_DIR=${0:a:h} # full path to this script

# Directories names to use to demo the `taq init` and `taq scaffold` tasks respectively
# WARNING These get blown away arbitrarily: don't store anything therein
INIT_DEMO_DIR='taq-init-demo'
SCAF_DEMO_DIR='taq-scaf-demo'

# tput color codes to differentiate easily input/commands from output/result
COMMAND_COLOR=5
OK_COLOR=2
ERROR_COLOR=1
WARN_COLOR=6
WHITE=7

newline() { echo "\n"; }

_ok() { # print success
    [[ -o interactive ]] && tput setaf $OK_COLOR
    echo "$@" "\n"
}

_warn() { # print warning
    [[ -o interactive ]] && tput setaf $WARN_COLOR
    echo "$@" "\n"
}

_err() { # print error to stderr
    [[ -o interactive ]] && tput setaf $ERROR_COLOR
    echo "$@" 1>&2 "\n"
}

check_node_version() {
    IFS=\. read -r major minor patch < <(node --version)
    # echo "Got major '$major' minor '$minor' patch '$patch' "
    [[ "v16" != "$major" ]] && _err 'Bad node version' && return 1 || return 0
}

_setup_verify_demo() {
    nvm use 16 > /dev/null
    check_node_version # belt and braces
}

check_taq_version() {
    tput setaf $COMMAND_COLOR
    echo 'taq --version'
    local version=$(taq --version)
    [[ $EXPECTED_TAQ_VERSION =~ $version ]] || _err 'Taqueria version mismatch'
    _ok "Version check successful ($version)"
}

set_nvm() { echo 'nvm use 16'; }

_clean_demo() { cd $SCRIPT_DIR && rm -rf $INIT_DEMO_DIR && rm -rf $SCAF_DEMO_DIR; }

_clean_contracts() {
    [[ ! -d 'artifacts' ]] && _err 'Not in a Taqueria project' && return 1
    setopt localoptions rmstarsilent  # zsh
    rm -f artifacts/*;
}

taq_init_taq_demo() {
    [[ -d $INIT_DEMO_DIR ]] && _err "Directory '$INIT_DEMO_DIR' exists" && return 1
    echo "taq init $INIT_DEMO_DIR"
}

_cd_init_demo_dir() { cd $INIT_DEMO_DIR; }

# Caution: recursive; skip for scaffold
list_contents() { echo "ls --color=always -I 'node_modules' -I '.git' -lAR | less -F -R -X"; }

display_environment() { echo 'taq get-environment'; }

display_help() { echo 'taq --help'; }

return_to_script_dir() { cd $SCRIPT_DIR; } # return to starting point

_install_plugin() { echo "taq install @taqueria/${1}" }

_install_core_plugin() { taq install @taqueria/plugin-core ; }
install_ligo_plugin() { echo taq install @taqueria/ plugin-ligo ; }
install_taquito_plugin() { echo taq install @taqueria/plugin-taquito ; }
install_flextesa_plugin() { echo taq install @taqueria/plugin-flextesa ; }
install_smartpy_plugin() { echo taq install @taqueria/plugin-smartpy ; }
install_contract_types_plugin() { echo taq install @taqueria/plugin-contract-types ; }

copy_ligo_to_contracts() {
    [[ ! -d 'contracts/' ]] && _err 'No `contracts/` directory found' && return 1
    echo 'cp ../skel/*.mligo contracts/'
}

# Ligo plugin
compile_single_contract() { echo 'taq compile hello-tacos.mligo'; }
compile_ligo_contracts() { echo 'taq compile-all --plugin @taqueria/plugin-ligo'; }
run_ligo_tests() { echo 'taq test hello-tacos.test.mligo --plugin @taqueria/plugin-ligo'; }

# Flextesa plugin
_start_sandbox() {
    taq stop sandbox $1 > /dev/null
    echo "taq start sandbox $1"
}
# Sandbox names currently differ between {init,scaffold}'d projects....
start_sandbox_local() { _start_sandbox local; }
list_accounts_init() { echo 'taq list accounts local'; }

# Taquito plugin
originate_hello_tacos() { echo 'taq originate hello-tacos.tz'; }

# SmartPy Plugin
compile_smartpy_contracts() { echo 'taq compile-all --plugin @taqueria/plugin-smartpy'; }
run_smartpy_tests() { echo 'taq test hello-tacos.py --plugin @taqueria/plugin-smartpy'; }

# Scaffold functionality
start_sandbox_development() { _start_sandbox development; }
start_dapp() { echo 'npm run start:app' ; }
list_accounts_scaf() { echo 'taq list accounts development'; }

_contract_address() {
    (( $# != 1 )) && _err 'Missing environment argument' && return 1
    dev_json=$(find -type f -name config.local.${1}.json)
    jq -r '.contracts."hello-tacos"."address"' $dev_json # assumes one is there!
}
# Not 'scripted': for interactive use, e.g. with (c)ommand action
development_contract_address() { _contract_address development; }
testing_contract_address() { _contract_address testing; }

print_storage() {
    address=$(contract_address)
    # FIXME Assumption that we're on 20000
    echo "curl http://localhost:20000/chains/main/blocks/head/context/contracts/${address}/storage"
}

_copy_smartpy_to_contracts() {
    [[ ! -d 'contracts/' ]] && _err 'Directory `contracts/` not found' && return 1
    [[ ! -f '../skel/hello-tacos.py' ]] && _err 'Missing ../skel/hello-tacos.py' && return 2
    echo 'cp ../skel/hello-tacos.py contracts'
}

set_development_environment() { echo 'taq set-environment development'; }

generate_types() { echo 'taq generate types'; }
show_generated_type() {
    # `pyg` is a function to color-code files on stdout, based on Pygmentize. Happy to share.
    pager=$([[ `uname -n` =~ gauss ]] && echo 'pyg' || echo 'less')
    echo "$pager 'types/hello-tacos.types.ts'"
}

_scaffold_toolkit_hack() {
    npm install ../../taqueria-toolkit
    cd app
    npm install ../../../taqueria-toolkit
    cd ..
}

_delete_state() { rm -f .taq/*state*; }

_prepare_scaffold_taco_shop() {
    cd $SCAF_DEMO_DIR
    _scaffold_toolkit_hack
    taq set-environment development
    _delete_state
}

scaffold_taco_shop() {
    [[ ! -f taq-demo.sh ]] && _err 'Not in script root' && return 1
    [[ -d $SCAF_DEMO_DIR ]] && _err 'Project exists' && return 2
    local url='https://github.com/ecadlabs/taqueria-scaffold-taco-shop'
    echo "taq scaffold -b prerelease $url $SCAF_DEMO_DIR"
}

goodbye() {
    _ok 'Cleaning up...'
    # [[ -d '.taq/' ]] && taq stop sandbox local >& /dev/null
    [[ -d '.taq/' ]] && return_to_script_dir
    _ok 'Done'
}

# Modify to taste
steps=(
    _clean_demo
    _setup_verify_demo

    # Demo Init
    taq_init_taq_demo # n.b. this will cd into the created directory
    _cd_init_demo_dir
    list_contents
    display_environment
    # display_help

    _install_core_plugin # Do this silently, it's a detail

    # Demo Ligo plugin
    display_help
    copy_ligo_to_contracts
    compile_single_contract
    list_contents
    compile_ligo_contracts
    run_ligo_tests

    goodbye # ***

    # # Demo SmartPy plugin
    # install_smartpy_plugin
    # clean_contracts
    # copy_smartpy_to_contracts
    # compile_smartpy_contracts
    # run_smartpy_tests
    # list_contents

    # # Demo flextesa plugin
    # install_flextesa_plugin
    # # display_help
    # start_sandbox
    # list_accounts

    # # Demo Taquito plugin
    # install_taquito_plugin
    # originate_hello_tacos
    # print_storage

    # # Demo Contract-Types plugin
    # install_contract_types_plugin
    # generate_types
    # show_generated_type

    # Demo scaffolding
    _clean_demo
    scaffold_taco_shop  # n.b. this will cd into $SCAF_DEMO_DIR
    _prepare_scaffold_taco_shop
    start_sandbox_development
    compile_ligo_contracts
    originate_hello_tacos

    # # list_accounts_scaf
    start_dapp

    # # Demo VSCE
    # open_vscode

    goodbye)

_reset_terminal_colors() { tput sgr0; } # "select graphic rendition 0"

demo() {
    local help=' ↪ (o)k | (s)kip | (r)epeat | (p)revious | (q)uit | (c)ommand'
    local ctr=1
    while do
        _reset_terminal_colors
        unset action
        local step=${steps[ctr]}
        # echo "Current step: $step"
        [[ $step =~ 'goodbye' ]] && goodbye && break # say goodbye automatically
        if _is_private_command $step; then
            # echo "Evaluating private command $step"
            eval $step # private commands run silently
        else
            command=$(eval $step)  # get the command
            tput setaf $COMMAND_COLOR
            vared -p "$ $command " -c action
            case $action in
                o|$'\n') tput setaf $OK_COLOR && eval $command && newline ;;
                s) _warn "Skipping $step" ;;
                r) eval ${steps[ctr-1]} && continue ;;
                p) (( ctr-- )) && continue ;;
                q) goodbye && break ;;
                c) echo -n "\n$ " && read command && eval $command && newline && continue;;
                h) echo $help && continue ;;
                *) _err "Try again" && continue ;;
            esac
        fi
        (( $? == 0)) && (( ctr++ )) # Advance iff last step was successful
    done
}

resource_demo() { source $SCRIPT_DIR/taq-demo.sh; }
alias res=resource_demo
