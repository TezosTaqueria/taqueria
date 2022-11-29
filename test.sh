#!/usr/bin/env bash

ali="refs/pull/1123/merge"
echo "${ali##*/}"
echo "${ali//\//-}"
