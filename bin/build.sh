#!/usr/bin/env bash
source ./bin/set-vars.sh

if [ "$0" == "./bin/build.sh" -a -f index.ts ]; then
    HAS_DENO=`which deno`
    if [  -z "$HAS_DENO" ]; then
        echo "Please install deno before attempting to build."
        echo "Run: curl -fsSL https://deno.land/install.sh | sh"
    else
        VERSION=$(deno --version | awk '/deno/{print $2}' | awk -F. '{print $1"."$2}')
        MAJOR_VERSION=$(echo $VERSION | cut -d. -f1)
        MINOR_VERSION=$(echo $VERSION | cut -d. -f2)

        if [ "$MAJOR_VERSION" -lt "1" ] || [ "$MAJOR_VERSION" -eq "1" -a "$MINOR_VERSION" -lt "36" ]; then
            echo "❌ Deno is installed, but the version is less than v1.34. Please use Deno v1.36 or greater."
            exit 1
        fi
        if [  -z "$DENO_TARGET" ]; then
            TARGET_ARG=""
        else
            TARGET_ARG="--target $DENO_TARGET"
        fi
        deno compile -o taq --allow-run --allow-write --allow-read --allow-env --allow-net --no-prompt index.ts $TARGET_ARG --setBuild "$TAQ_BUILD" --setVersion "$TAQ_VERSION"  
    fi
else
    echo "Usage: ./bin/build.sh"
    echo "(please run from within project root)"
fi
