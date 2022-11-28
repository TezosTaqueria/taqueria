#!/usr/bin/env bash
BRANCH=`git rev-parse --abbrev-ref HEAD`
COMMIT=`git rev-parse --short HEAD`
TAQ_VERSION="dev-$BRANCH"
TIMESTAMP=`date +%s`
BUILD="$COMMIT"
