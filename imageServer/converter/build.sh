# This script builds the USDZ to OBJ converter
cd ../modules/USDConverter && xcodebuild -scheme USDConverter build SYMROOT=$(PWD)/../../converter/build
