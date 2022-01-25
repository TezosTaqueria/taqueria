#!/bin/sh
echo '**********************************************'
echo '******* BUILDING ALL TAQUERIA PACKAGES *******'
echo '**********************************************'

echo "Building node-sdk"
cd taqueria-sdk
npm install
npm run build
cd ../

for dir in `ls -1d *plugin*`; do
    cd $dir
    echo "Building $dir (in parallel)"
    ../bin/build-plugin.sh $dir &
    cd ../
done

echo "Building taqueria (in parallel)"
npm run build &
wait
echo "Builds complete!"