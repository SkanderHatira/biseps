#!/bin/bash

sourceEnv=$1
profile=$2

source $HOME/miniconda3/bin/activate
source  $sourceEnv
snakemake --profile $profile --unlock
snakemake --profile $profile -n