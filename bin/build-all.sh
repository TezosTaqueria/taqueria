#!/bin/bash

if [ "$0" == "./bin/build-all.sh" -a -f index.ts ]; then
    echo '**********************************************'
    echo '******* BUILDING ALL TAQUERIA PACKAGES *******'
    echo '**********************************************'

    echo "** Installing NPM dependencies"
    npm install

    echo "** Building taqueria-protocol"
    npm run build --workspace=taqueria-protocol

    echo "** Building node-sdk"
    npm run build --workspace=taqueria-sdk

    for dir in `ls -1d *plugin*`; do
        if [ -d $dir ]; then
            ./bin/build-plugin.sh $dir
        fi
    done

    echo "** Building taqueria"
    npm run build
    wait
    echo "** Builds complete!"

else
    echo "Usage: ./bin/build-all.sh"
    echo "(please run from within project root)"
fi