#!/usr/bin/env bash
source ../bin/set-vars.sh

docker build . -t "ghcr.io/ecadlabs/taqueria-flextesa:${TAQ_VERSION}-${BUILD}"
