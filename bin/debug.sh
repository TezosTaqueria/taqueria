#!/bin/bash
BRANCH=`git branch --show-current`
TAQ_VERSION="dev:$BRANCH"
TIMESTAMP=`date +%s`
BUILD="${BRANCH}-${TIMESTAMP}"

if [ "$0" == "./bin/debug.sh" -a -f index.ts ]; then
    DENO_DIR=./deno deno run --inspect-brk --allow-run --allow-write --allow-read --allow-env index.ts --quickstart "`cat quickstart.md`" --setBuild "$BUILD" --setVersion "$TAQ_VERSION" $@
else
    echo "Usage: ./bin/build.sh"
    echo "(please run from within project root)"
fi