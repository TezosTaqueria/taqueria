#!/bin/bash
BRANCH=`git branch --show-current`
COMMIT=`git rev-parse --short HEAD`
TAQ_VERSION="dev-$BRANCH"
TIMESTAMP=`date +%s`
BUILD="$COMMIT"


if [ "$0" == "./bin/build.sh" -a -f index.ts ]; then
    HAS_DENO=`which deno`
    if [  -z "$HAS_DENO" ]; then
        echo "Please install deno before attempting to build."
        echo "Run: curl -fsSL https://deno.land/install.sh | sh"
    else
        DENO_DIR=./deno deno compile -o taq --allow-run --allow-write --allow-read --allow-env --import-map ./import_map.json --no-prompt index.ts --quickstart "`cat quickstart.md`" --setBuild "$BUILD" --setVersion "$TAQ_VERSION"
    fi
else
    echo "Usage: ./bin/build.sh"
    echo "(please run from within project root)"
fi