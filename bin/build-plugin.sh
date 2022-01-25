#!/bin/bash
npm install
HASBUILD=`node -e "console.log(require('./package.json').scripts.build ? 'true': 'false')"`
if [ $HASBUILD = "true" ]; then
    npm run build
fi