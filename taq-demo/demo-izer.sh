#!/bin/env/zsh
# Copyright (c) 2023 ECAD Labs. All rights reserved.
#
# The demo-izer: simple, flexible, repeatable command-line demos.
# 
# * "Private" commands are prefixed with "_" and are executed silently
# * "Public" commands are written to stdout and await an action (such as (o)k)
#
# See the README for more details.
#

# Use tput/setaf color codes to differentiate easily input/commands from output/result
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

_reset_terminal_colors() { tput sgr0; } # "select graphic rendition 0"

# Private commands are executed w/o reading 'action' from the user
# It is up to the command whether or not it produces any output.
_is_private_command() { [[ ${1:0:1} == '_' ]]; }

demo() {
    local help=' ↪ (o)k | (s)kip | (r)epeat | (p)revious | (q)uit | (c)ommand'
    local ctr=1
    [[ $AUTO_DEMO_MODE == 'true' ]] && _ok 'Auto-demo mode set: on your marks...'
    while do
        _reset_terminal_colors
        [[ $AUTO_DEMO_MODE == 'true' ]] && unset action
        local step=${steps[ctr]}
        [[ $step =~ 'goodbye' ]] && goodbye && break # say goodbye automatically
        if _is_private_command $step; then
            eval $step # private commands run silently
        else
            command=$(eval $step)  # get the command echoed from `step`
            tput setaf $COMMAND_COLOR
            if [[ $AUTO_DEMO_MODE != 'true' ]]; then
                vared -p "$ $command " -c action  # print command and ask for $action
            else
                # Auto-demo mode: emulate $command and setup $action (o)k
                echo -n "$ $command"
                action='o'
            fi
            case $action in
                o|$'\n') tput setaf $OK_COLOR && eval $command && newline ;;
                s) _warn "Skipping $step" ;;
                r) eval ${steps[ctr-1]} && continue ;; # TODO Skip back to last *public* method
                p) (( ctr-- )) && continue ;; # TODO Skip back to last *public* method
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
