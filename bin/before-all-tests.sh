#!/usr/bin/env bash
set -e # exiting on error

docker ps > /dev/null # making sure docker is installed, running, and the user has permission

# Clean all docker containers before running any tests
docker rm -vf $(docker ps -aq) > /dev/null 2>&1 || echo "There are no docker containers to remove"

rm -rf ./scrap | true
mkdir ./scrap
