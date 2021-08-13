#!/bin/bash
sourceEnv=$1
profile=$2
workflow=$3
which conda
which python
source  $sourceEnv/activate
cd $workflow
pwd
$sourceEnv/snakemake --profile $profile --unlock > $profile/../../../biseps.txt
$sourceEnv/snakemake --profile $profile --rerun-incomplete >> $profile/../../../biseps.txt