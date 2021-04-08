#!/bin/bash
sourceEnv=$1
profile=$2
workflow=$3

which conda
which python
source  $sourceEnv/activate
cd $workflow
$sourceEnv/snakemake --profile $profile --unlock
$sourceEnv/snakemake --profile $profile --rerun-incomplete