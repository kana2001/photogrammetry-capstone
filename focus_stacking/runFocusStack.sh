#!/bin/bash

# Check if the user provided an argument
if [ $# -eq 0 ]; then
    echo "Usage: $0 <your_argument>"
    exit 1
fi

# Access the first argument passed to the script
input="$1"

echo "./focus-stack/build/focus-stack $input/*"

./focus-stack/build/focus-stack $input/*
