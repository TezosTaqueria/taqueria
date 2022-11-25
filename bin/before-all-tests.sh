#!/usr/bin/env bash
set -e # exiting on error

docker ps # making sure docker is installed, running, and the user has permission

rm -rf ./scrap
mkdir ./scrap
