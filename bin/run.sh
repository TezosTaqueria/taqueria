#!/usr/bin/env bash
source ./bin/set-vars.sh

BIN_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";
PROJ_DIR="${BIN_DIR}/.."

if [ "$0" == "./bin/run.sh" -a -f index.ts ]; then
    deno run --allow-run --unstable --allow-write --allow-read --allow-env --allow-net index.ts --setBuild "$TAQ_BUILD" --setVersion "$TAQ_VERSION" $@
else
    echo "Usage: ./bin/build.sh"
    echo "(please run from within project root)"
fi
