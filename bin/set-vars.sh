#!/usr/bin/env bash
BRANCH=`git branch --show-current`
COMMIT=`git rev-parse --short HEAD`
TAQ_VERSION="dev-$BRANCH"
TIMESTAMP=`date +%s`
BUILD="$COMMIT"
