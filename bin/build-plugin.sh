#!/bin/bash
WORKSPACE=$1
INSTALL="$2"

if [ -n $INSTALL ]; then
    npm install
fi

npm run build --workspace=$WORKSPACE