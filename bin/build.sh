#!/usr/bin/env bash
source ./bin/set-vars.sh

if [ "$0" == "./bin/build.sh" -a -f index.ts ]; then
    HAS_DENO=`which deno`
    if [  -z "$HAS_DENO" ]; then
        echo "Please install deno before attempting to build."
        echo "Run: curl -fsSL https://deno.land/install.sh | sh"
    else
        VERSION=$(deno --version | grep -oP 'deno \K([0-9]+\.[0-9]+)')
        MAJOR_VERSION=$(echo $VERSION | cut -d. -f1)
        MINOR_VERSION=$(echo $VERSION | cut -d. -f2)

        if [ "$MAJOR_VERSION" -lt "1" ] || [ "$MAJOR_VERSION" -eq "1" -a "$MINOR_VERSION" -lt "34" ]; then
            echo "❌ Deno is installed, but the version is less than v1.34. Please use Deno v1.34 or greater."
            exit 1
        fi
        if [  -z "$DENO_TARGET" ]; then
            TARGET_ARG=""
        else
            TARGET_ARG="--target $DENO_TARGET"
        fi
        deno compile -o taq --unstable --allow-run --allow-write --allow-read --allow-env --allow-net --import-map ./import_map.json --no-prompt index.ts --lock ./deno-lock.json $TARGET_ARG -- --setBuild "$BUILD" --setVersion "$TAQ_VERSION"  
    fi
else
    echo "Usage: ./bin/build.sh"
    echo "(please run from within project root)"
fi
