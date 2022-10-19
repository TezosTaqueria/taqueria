#!/usr/bin/env bash

if [ "$0" == "./bin/build-all.sh" ] && [ -f index.ts ]; then
    echo '**********************************************'
    echo '******* BUILDING ALL TAQUERIA PACKAGES *******'
    echo '**********************************************'
    echo ""
    echo '**********************************************'
    echo "** Installing NPM dependencies"
    npm install

    echo ""
    echo '**********************************************'
    echo "** Building packages"
    npm run build --workspaces --if-present

    echo ""
    echo '**********************************************'
    echo "** Building taqueria"
    npm run build

    echo ""
    echo '**********************************************'
    echo "** Building docker images"
    npm run build-docker --workspaces --if-present

    echo ""
    echo '**********************************************'
    echo "** Builds complete!"

else
    echo "Usage: ./bin/build-all.sh"
    echo "(please run from within project root)"
fi
