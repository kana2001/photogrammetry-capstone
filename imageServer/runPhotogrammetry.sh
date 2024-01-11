#!/bin/bash

./HelloPhotogrammetry ./received_images ./received_images/model.usdz -d full -o sequential -f normal

# Check if the program exited successfully
if [ $? -eq 0 ]; then
    echo "HelloPhotogrammetry completed successfully."
else
    echo "HelloPhotogrammetry failed with exit code $?."
fi