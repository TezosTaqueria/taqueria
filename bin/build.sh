#!/bin/bash
if [ "$0" == "./bin/build.sh" -a -f index.ts ]; then
    DENO_DIR=./deno deno compile --allow-run --allow-write --allow-read --allow-env index.ts
else
    echo "Usage: ./bin/build.sh"
    echo "(please run from within project root)"
fi