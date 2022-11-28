#!/usr/bin/env bash
TAQUERIA_BRANCH=`git branch --show-current`
TAQUERIA_COMMIT=`git rev-parse --short HEAD`
TAQ_VERSION="dev-$TAQUERIA_BRANCH"
TIMESTAMP=`date +%s`
BUILD="$TAQUERIA_COMMIT"
