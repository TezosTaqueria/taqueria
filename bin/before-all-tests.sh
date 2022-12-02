#!/usr/bin/env bash
set -e # exiting on error

docker ps > /dev/null

# Clean all docker containers before running any tests
docker rm -vf $(docker ps -aq) > /dev/null 2>&1 || echo "There are no docker containers to remove"

rm -rf ./scrap
mkdir ./scrap
