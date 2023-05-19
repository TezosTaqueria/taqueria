#!/usr/bin/env bash

set -euo pipefail

usage () {
    >&2 cat <<EOF
Usage: $(basename $0) <options>

The options are as follows:

--prefix <prefix>
        Install into directory <prefix>.

--native
        Install native binaries (experimental).

--yes
        Answer 'y' to all questions during installation.

--projectDir
        The directory where the project is located.

--help

EOF
exit
}

prefix=~/smartpy-cli
from=AUTO
with_smartml=false
native=false
yes=false
projectDir="."

while [[ $# -gt 0 ]]; do
    case "$1" in
        --prefix)
            prefix="$2"
            shift 2
            ;;
        --native)
            native=true
            shift
            ;;
        --yes)
            yes=true
            shift
            ;;
        --project)
            projectDir="$2"
            shift 2
            ;;
        --help)
            usage
            ;;
        *)
            >&2 echo Unexpected argument: "$1"
            >&2 echo NOTE: SmartML not supported yet.
            exit 1
            ;;
    esac
done


>&2 echo -n "Install into $prefix? [y/N] "
if [ "$yes" == "true" ]; then
    >&2 echo "y"
else
    read ok
    if [ "$ok" != "y" ]; then
        >&2 echo "Installation aborted."
        exit 1
    fi
fi

if [ -d "$prefix" ]; then
    >&2 echo -n "The directory $prefix exists. Delete and replace? [y/N] "
    if [ "$yes" == "true" ]; then
        >&2 echo "y"
    else
        read ok
        if [ "$ok" != "y" ]; then
            >&2 echo "Installation aborted."
            exit 1
        fi
    fi
    rm -rf "$prefix"
fi

if [ -e "$prefix" ]; then
    >&2 echo "$prefix exists, but is not a directory."
    exit 1
fi

mkdir -p "$prefix"

>&2 echo "Downloading files..."
git clone https://gitlab.com/SmartPy/SmartPy /tmp/smartpy
# curl "$from"/smartpy-cli.tar.gz | tar xzf - -C "$prefix"
cp -r /tmp/smartpy/smartpy-cli/* "$prefix" 2>/dev/null || true
if [ "$native" != true ]; then
    rm -f "$prefix/smartpyc"
fi

# # Copy prebuilt files stored in the plugin
cp projectDir/node_modules/\@taqueria/plugin-smartpy/smartpy-v0.16.0/* "$prefix"

>&2 echo "Installing npm packages..."
cd "$prefix"
npm --loglevel silent --ignore-scripts init --yes > /dev/null
npm --loglevel silent --ignore-scripts install libsodium-wrappers-sumo bs58check js-sha3 tezos-bls12-381 chalk @smartpy/originator @smartpy/timelock
cd -

>&2 echo "Cleaning up..."
rm -rf /tmp/smartpy

>&2 echo "Installation successful in $prefix."
