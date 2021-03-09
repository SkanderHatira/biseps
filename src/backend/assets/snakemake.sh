#!/bin/bash
ls ../../
ls ../
ls 
sourceEnv=$1
profile=$2
workflow=$3
source  $sourceEnv
cd $workflow
snakemake --profile $profile --unlock
snakemake --profile $profile -n