#!/bin/bash

sourceEnv=$1
profile=$2

source  $sourceEnv
snakemake --profile $profile --unlock
snakemake --profile $profile -n