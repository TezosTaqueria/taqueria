#!/usr/bin/env bash
source ./bin/set-vars.sh

BIN_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";
PROJ_DIR="${BIN_DIR}/.."

if [ "$0" == "./bin/run.sh" -a -f index.ts ]; then
    DENO_DIR=./deno deno run --allow-run --allow-write --allow-read --allow-env --allow-net --import-map "${PROJ_DIR}/import_map.json" index.ts --setBuild "$BUILD" --setVersion "$TAQ_VERSION"  --lock ./deno-lock.json $@
else
    echo "Usage: ./bin/build.sh"
    echo "(please run from within project root)"
fi
