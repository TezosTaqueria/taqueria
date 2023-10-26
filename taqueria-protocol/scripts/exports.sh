#!/bin/bash

for file in *.js; do
    baseName=$(basename "$file" .js)
    echo "\"./$baseName\": {\"import\": \"./$file\", \"default\": \"./$file\"},"
done
