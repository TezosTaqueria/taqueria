#!/usr/bin/env bash
source ./bin/set-vars.sh

if [ "$0" == "./bin/build.sh" -a -f index.ts ]; then
    HAS_DENO=`which deno`
    if [  -z "$HAS_DENO" ]; then
        echo "Please install deno before attempting to build."
        echo "Run: curl -fsSL https://deno.land/install.sh | sh"
    else
        deno --version | grep 1.23 >/dev/null
        errorCode=$?
        if [ $errorCode -ne 0 ]; then
           echo "Deno is installed, but not using v1.23.x."
           exit $errorCode
        fi

        if [  -z "$DENO_TARGET" ]; then
            TARGET_ARG=""
        else
            TARGET_ARG="--target $DENO_TARGET"
        fi
        deno compile -o taq --unstable --allow-run --allow-write --allow-read --allow-env --allow-net --import-map ./import_map.json --no-prompt index.ts --setBuild "$BUILD" --setVersion "$TAQ_VERSION" --lock ./deno-lock.json $TARGET_ARG
    fi
else
    echo "Usage: ./bin/build.sh"
    echo "(please run from within project root)"
fi
