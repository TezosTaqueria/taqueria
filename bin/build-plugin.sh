#!/usr/bin/env bash
WORKSPACE=$1
INSTALL="$2"

if [ -n $INSTALL ]; then
    npm install
fi

retry=10
success=0
while [ $retry -ne 0 ]; do
    output=$(npm run build --workspace=$WORKSPACE 2>&1)
    success=$?
    echo $output | grep -i "segmentation" >/dev/null
    noSegFault=$?
    if [ $noSegFault -ne 1 ]; then
        echo "** Could not build ${WORKSPACE} due to Parcel segfault. Retrying..."
        retry=$((retry-1))
    else
        retry=0
    fi
    echo "*** ${output}"
done

if [ $success -ne 0 ]; then
    echo "** Could not build ${WORKSPACE}."
    echo $output
    exit 1
else
    echo "** Built ${WORKSPACE}"
fi
