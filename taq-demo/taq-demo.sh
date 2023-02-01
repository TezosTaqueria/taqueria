#!/bin/env/zsh
# Copyright (c) 2023 ECAD Labs. All rights reserved.
#
# Run a Taqueria demo: `source taq-demo.sh && demo`
#
# See README for more details.
#
EXPECTED_TAQ_VERSION='v0.28.0'
SCRIPT_DIR=${0:a:h} # full path to this script

# Directories names to use to demo the `taq init` and `taq scaffold` tasks
# WARNING These get blown away arbitrarily: don't store anything therein
INIT_DEMO_DIR='taq-init-demo'
SCAF_DEMO_DIR='taq-scaf-demo'

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
    echo "$@"
    newline
}

_err() { # print error to stderr
    [[ -o interactive ]] && tput setaf $ERROR_COLOR
    echo "$@" 1>&2
    newline
}

# Echo the command, then execute it
_command() {
    tput setaf $COMMAND_COLOR
    echo $1
    tput setaf $OK_COLOR
    eval $1
}

check_taq_version() {
    tput setaf $COMMAND_COLOR
    echo 'taq --version'
    local version=$(taq --version)
    [[ $EXPECTED_TAQ_VERSION =~ $version ]] || _err 'Taqueria version mismatch'
    _ok "Version check successful ($version)"
}

set_nvm() { _command 'nvm use 16' && newline; }

_clean_demo() { rm -rf $INIT_DEMO_DIR && rm -rf $SCAF_DEMO_DIR; }

clean_demo() {
    [[ ${PWD:t} =~ $INIT_DEMO_DIR || ${PWD:t} =~ $SCAF_DEMO_DIR ]] && cd $SCRIPT_DIR
    tput setaf $COMMAND_COLOR
    _command "rm -rf $INIT_DEMO_DIR && rm -rf $SCAF_DEMO_DIR"
    _ok 'Project(s) cleaned successfully'
}

clean_contracts() {
    setopt localoptions rmstarsilent  # zsh
    rm -f artifacts/*;
}

taq_init_taq_demo() {
    [[ -d $INIT_DEMO_DIR ]] && _err "Directory '$INIT_DEMO_DIR' exists" && return 1
    _command "taq init $INIT_DEMO_DIR"
    newline
    cd $INIT_DEMO_DIR
}

# Caution: recursive; skip for scaffold
list_contents() { ls --color=always -I 'node_modules' -I '.git' -lAR | less -F -R -X; }

init_git() {
    [[ -d '.git' ]] && _err "Directory '.git' exists" && return 1
    tput setaf $WHITE
    git init
    git add .
    git commit -m 'Initial commit'
    _ok "Git initialized successfully..."
}

commit_work() {
    [[ ! -d '.git/' ]] && return 0 # No problem: Didn't set up git
    git add .
    git commit -m ${1:-'Next commit'}
}

display_environment() {
    _command 'taq get-environment'
    newline
}

cat_gitignore() {
    tput setaf $WHITE
    cat .gitignore
    newline
}

display_help() {
    _command 'taq --help'
}

return_to_script_dir() { cd $SCRIPT_DIR; } # return to starting point

_install_plugin() {
    (($# != 1)) && _err 'Missing plugin argument' && return 1
    _command "taq install @taqueria/${1}"
    newline
}

install_core_plugin() { _install_plugin plugin-core ; }
install_ligo_plugin() { _install_plugin plugin-ligo ; }
install_taquito_plugin() { _install_plugin plugin-taquito ; }
install_flextesa_plugin() { _install_plugin plugin-flextesa ; }
install_smartpy_plugin() { _install_plugin plugin-smartpy ; }
install_contract_types_plugin() { _install_plugin plugin-contract-types ; }

git_diff() {
    [[ ! -d '.git/' ]] && return 0 # No problem: Didn't set up git
    git diff
}

copy_ligo_to_contracts() {
    [[ ! -d 'contracts/' ]] && _err 'No `contracts/` directory found' && return 1
    cp ../skel/*.mligo contracts/
   _ok 'Template CameLIGO contracts copied to `contracts/`'
}

# Ligo plugins
compile_single_contract() { _command 'taq compile hello-tacos.mligo'; }
compile_ligo_contracts() { _command 'taq compile-all --plugin @taqueria/plugin-ligo'; }
run_ligo_tests() { _command 'taq test hello-tacos.test.mligo --plugin @taqueria/plugin-ligo'; }

compile_smartpy_contracts() { _command 'taq compile-all --plugin @taqueria/plugin-smartpy'; }
run_smartpy_tests() { _command 'taq test hello-tacos.py --plugin @taqueria/plugin-smartpy'; }

# Flextesa plugin
start_sandbox() { _command 'taq start sandbox' && sleep 1; }  # sleep fixes "list_accounts [too fast]"
list_accounts() { _command 'taq list accounts local'; }

# Taquito plugin
originate_hello_tacos() { _command 'taq originate hello-tacos.tz --sender alice'; }

start_dapp() { _command 'npm run start:app'; }

# UNUSED
contract_address() {
    # Works at top-level (i.e. for print_storage) but only use one demo project at a time!
    dev_json=$(find -type f -name config.local.development.json)
    jq -r '.contracts."hello-tacos"."address"' $dev_json;
}

print_storage() {
    address=$(contract_address)
    # FIXME Assumption that we're on 20000
    _command "curl http://localhost:20000/chains/main/blocks/head/context/contracts/${address}/storage"
    newline
}

copy_smartpy_to_contracts() {
    [[ ! -d 'contracts/' ]] && _err 'Directory `contracts/` not found' && return 1
    cp ../skel/hello-tacos.py contracts
   _ok 'Template SmartPy contract copied to `contracts/`'
}

change_environment() {
    _command 'taq get-environment'
    _command 'taq set-environment testing'

}

generate_types() { _command 'taq generate types'; }
show_generated_type() {
    # `pyg` is a function to color-code files on stdout, based on Pygmentize. Happy to share.
    pager=$([[ `uname -n` =~ gauss ]] && echo 'pyg' || echo 'less')
    $pager 'types/hello-tacos.types.ts'
}

goodbye() {
    _ok 'Cleaning up...'
    # [[ -d '.taq/' ]] && taq stop sandbox local >& /dev/null
    [[ -d '.taq/' ]] && return_to_script_dir
    _ok 'Done'
}

# Modify to taste
steps=(
    # Setup / verify
    # check_taq_version
    # set_nvm

    # taq init
    taq_init_taq_demo # n.b. this will cd into the created directory
    # list_contents
    # cat_gitignore
    # init_git # this will do an 'Initial commit'
    # display_environment
    # display_help

    # Install plugin-core
    install_core_plugin
    # display_help
    # git_diff
    # commit_work

    # Demo Ligo plugin
    install_ligo_plugin
    # display_help
    # git_diff
    # commit_work
    copy_ligo_to_contracts
    compile_single_contract
    list_contents
    compile_ligo_contracts
    run_ligo_tests

    # Demo SmartPy plugin
    install_smartpy_plugin
    clean_contracts
    copy_smartpy_to_contracts
    compile_smartpy_contracts
    run_smartpy_tests
    list_contents

    # Demo flextesa plugin
    install_flextesa_plugin
    # display_help
    start_sandbox
    list_accounts

    # Demo Taquito plugin
    install_taquito_plugin
    originate_hello_tacos
    print_storage
    
    # git_diff
    # commit_work

    # Demo scaffolding
    # start_dapp

    goodbye)

demo() {
    _clean_demo
    local ctr=1
    while do
        unset choice # forget last choice
        local step=${steps[ctr]}
        [[ $step =~ 'goodbye' ]] && goodbye && return 0 # say goodbye automatically
        vared -p "Next: '$step' ↪ (o)k | (s)kip | (r)epeat | (p)revious | (q)uit | (c)ommand → " -c choice
        case $choice in
            o|' ') eval ${steps[ctr]} ;;
            s) _warn "Skipping $step" ;;
            r) eval ${steps[ctr-1]} && continue ;;
            p) (( ctr-- )) && continue ;;
            q) goodbye && break ;;
            c) echo -n "\n$ " && read command && eval $command && newline && continue;;
            *) _err "Try again" && continue ;;
        esac
        (( $? == 0)) && (( ctr++ )) # Advance iff last step was successful
    done
}

resource_demo() { source $SCRIPT_DIR/taq-demo.sh; }
alias res=resource_demo
