#!/usr/bin/env bash
BRANCH=`git branch --show-current`
TAQ_VERSION="dev:$BRANCH"
TIMESTAMP=`date +%s`
BUILD="${BRANCH}-${TIMESTAMP}"
BIN_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";
PROJ_DIR="${BIN_DIR}/.."

DENO_DIR=./deno deno run --inspect-brk --allow-run --allow-write --allow-read --allow-env --allow-net --import-map "${PROJ_DIR}/import_map.json" "${PROJ_DIR}/index.ts" --quickstart "`cat ${PROJ_DIR}/quickstart.md`" --setBuild "$BUILD" --setVersion "$TAQ_VERSION"  --lock ./deno-lock.json $@
