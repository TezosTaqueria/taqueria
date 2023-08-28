#!/usr/bin/env bash
source ./bin/set-vars.sh

BIN_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";
PROJ_DIR="${BIN_DIR}/.."

echo $BUILD
echo $TAQ_VERSION
deno run --inspect-brk --unstable --allow-run --allow-write --allow-read --allow-env --allow-net --import-map "${PROJ_DIR}/import_map.json" "${PROJ_DIR}/index.ts" --setBuild "$BUILD" --setVersion "$TAQ_VERSION" $@
