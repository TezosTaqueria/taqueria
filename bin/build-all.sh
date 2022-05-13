#!/bin/bash -e

if [ "$0" == "./bin/build-all.sh" -a -f index.ts ]; then
    echo '**********************************************'
    echo '******* BUILDING ALL TAQUERIA PACKAGES *******'
    echo '**********************************************'
    echo ""
    echo '**********************************************'
    echo "** Installing NPM dependencies"
    npm install

    echo ""
    echo '**********************************************'
    echo "** Building taqueria-protocol"
    npm run build --workspace=taqueria-protocol

    echo ""
    echo '**********************************************'
    echo "** Building node-sdk"
    npm run build --workspace=taqueria-sdk

    for dir in `ls -1d *plugin*`; do
        if [ -d $dir ]; then
            echo ""
            echo '**********************************************'
            echo "** Building ${dir}"
            ./bin/build-plugin.sh $dir
        fi
    done

    echo ""
    echo '**********************************************'
    echo "** Building taqueria"
    npm run build

    echo ""
    echo '**********************************************'
    echo "** Building docker image"
    npm run build -w taqueria-flextesa-manager
    npm run build-docker -w taqueria-flextesa-manager

    echo ""
    echo '**********************************************'
    echo "** Builds complete!"

else
    echo "Usage: ./bin/build-all.sh"
    echo "(please run from within project root)"
fi