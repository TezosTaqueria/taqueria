#!/bin/env/zsh
# Copyright (c) 2023 ECAD Labs. All rights reserved.
#
# Run a Taqueria demo: `source taq-demo.sh && demo`
#
# * "Private" commands are prefixed with "_" and are executed silently
# * "Public" commands are written to stdout and await an action (such as (o)k)
#
# It works by specifying `steps` array and uses demo-izer.sh
# See the README for more details.

EXPECTED_TAQ_VERSION='v0.28.0'
SCRIPT_DIR=${0:a:h} # full path to this script

# Directories names to use to demo the `taq init` and `taq scaffold` tasks respectively
# WARNING These get blown away arbitrarily: don't store anything therein
INIT_DEMO='taq-init-demo'
SCAF_DEMO='taq-scaf-demo'

export AUTO_DEMO_MODE='false'
source ./demo-izer.sh

check_node_version() {
    IFS=\. read -r major minor patch < <(node --version)
    # echo "Got major '$major' minor '$minor' patch '$patch' "
    [[ "v16" != "$major" ]] && _err 'Bad node version' && return 1 || return 0
}

_setup_verify_demo() {
    _clean_demo
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

_clean_demo() {
    [[ -d '.taq/' ]] && taq stop sandbox
    cd $SCRIPT_DIR && rm -rf $INIT_DEMO && rm -rf $SCAF_DEMO;
}

_clean_contracts() {
    [[ ! -d 'artifacts' ]] && _err 'Not in a Taqueria project' && return 1
    setopt localoptions rmstarsilent  # zsh
    rm -f artifacts/*(N); # NULL_GLOB option: do not fail if no matches
}

taq_init_taq_demo() {
    [[ -d $INIT_DEMO ]] && _err "Directory '$INIT_DEMO' exists" && return 1
    echo "taq init $INIT_DEMO"
}

_cd_init_demo_dir() { cd $INIT_DEMO; }

# Caution: recursive; skip for scaffold
list_contents() { echo "ls --color=always -I 'node_modules' -I '.git' -lAR | less -F -R -X"; }

display_environment() { echo 'taq get-environment'; }

display_help() { echo 'taq --help'; }

return_to_script_dir() { cd $SCRIPT_DIR; } # return to starting point

_install_plugin() { echo "taq install @taqueria/${1}" }

_install_core_plugin() { taq install @taqueria/plugin-core >& /dev/null ; }
install_ligo_plugin() { echo 'taq install @taqueria/plugin-ligo' ; }
install_taquito_plugin() { echo 'taq install @taqueria/plugin-taquito' ; }
install_flextesa_plugin() { echo 'taq install @taqueria/plugin-flextesa' ; }
install_smartpy_plugin() { echo 'taq install @taqueria/plugin-smartpy' ; }
install_contract_types_plugin() { echo 'taq install @taqueria/plugin-contract-types' ; }

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
start_sandbox_init() { _start_sandbox local; }
start_sandbox_scaf() { _start_sandbox ; } # Specifying 'development' will result in an error

# Sleep mitigates intermittent "Error" in balances after starting a sandbox
list_accounts_init() { sleep 1; echo 'taq list accounts local'; }
list_accounts_scaf() { sleep 1; echo 'taq list accounts development'; }

# Taquito plugin
originate_hello_tacos() { echo 'taq originate hello-tacos.tz'; }

# SmartPy Plugin
compile_smartpy_contracts() { echo 'taq compile-all --plugin @taqueria/plugin-smartpy'; }
run_smartpy_tests() { echo 'taq test hello-tacos.py --plugin @taqueria/plugin-smartpy'; }

start_dapp() { echo 'npm run start:app &' ; }

_contract_address() {
    (( $# != 1 )) && _err 'Missing environment argument' && return 1
    dev_json=$(find -type f -name config.local.${1}.json)
    jq -r '.contracts."hello-tacos"."address"' $dev_json # assumes one is there!
}
# Not 'scripted'; for interactive use, e.g. with (c)ommand action
development_contract_address() { _contract_address development; }
testing_contract_address() { _contract_address testing; }

print_storage() {
    address=$(contract_address)
    # FIXME Assumption that we're on 20000 - only on a 'clean' run
    echo "curl http://localhost:20000/chains/main/blocks/head/context/contracts/${address}/storage"
}

copy_smartpy_to_contracts() {
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
    cd ${SCRIPT_DIR}/${SCAF_DEMO} # ensure location
    cd app  # now taq-scaf-demo/app
    npm install ../../../../taqueria/taqueria-toolkit
    cd src  # now taq-scaf-demo/app/src
    npm install ../../../../../taqueria/taqueria-toolkit
    cd ${SCRIPT_DIR}/${SCAF_DEMO}  # back to taq-scaf-demo/
}

_delete_state() {
    [[ ! -d '.taq' ]] && _err 'Wrong directory: no .taq/ found' && return 1
    setopt localoptions rmstarsilent  # zsh
    rm -f .taq/*state*(N); # NULL_GLOB option: belt and braces
}

_prepare_scaffold_taco_shop() {
    # _scaffold_toolkit_hack
    _delete_state
    taq set-environment development
}

_cd_scaff_demo_dir() { cd $SCAF_DEMO; }

scaffold_taco_shop() {
    [[ ! -f taq-demo.sh ]] && _err 'Not in script root' && return 1
    [[ -d $SCAF_DEMO ]] && _err 'Project exists' && return 2
    echo "taq scaffold -b prerelease https://github.com/ecadlabs/taqueria-scaffold-taco-shop $SCAF_DEMO"
}

open_vscode() { code-insiders .; }

goodbye() {
    _ok 'Cleaning up...'
    # [[ -d '.taq/' ]] && taq stop sandbox && return_to_script_dir
    _ok 'Done'
}

# Modify to taste
steps=(
    _setup_verify_demo

    # Demo Init
    taq_init_taq_demo # n.b. this will cd into the created directory
    _cd_init_demo_dir
    list_contents
    display_environment
    display_help

    _install_core_plugin # Do this silently, it's a detail

    # Demo Ligo plugin
    install_ligo_plugin
    display_help
    copy_ligo_to_contracts
    compile_single_contract
    list_contents
    compile_ligo_contracts
    run_ligo_tests

    # Demo flextesa plugin
    install_flextesa_plugin
    display_help
    start_sandbox_init
    list_accounts_init

    # Demo Taquito plugin
    install_taquito_plugin
    originate_hello_tacos
    # print_storage

    # Demo Contract-Types plugin
    install_contract_types_plugin
    generate_types
    show_generated_type

    # Demo SmartPy plugin
    install_smartpy_plugin
    _clean_contracts
    copy_smartpy_to_contracts
    run_smartpy_tests

    # <--- `taq init` above, `taq scaffold` below --->

    # Demo Scaffolding    
    _clean_demo
    scaffold_taco_shop
    _cd_scaff_demo_dir
    _prepare_scaffold_taco_shop
    start_sandbox_scaf
    list_accounts_scaf
    compile_ligo_contracts
    originate_hello_tacos

    # Demo VSCE first, because dismissing it returns here: unlike start_dapp
    # open_vscode
 
    start_dapp
    goodbye)

resource_demo() { source $SCRIPT_DIR/taq-demo.sh; }
alias res=resource_demo
