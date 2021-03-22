#!/bin/bash
sourceEnv=$1
profile=$2
workflow=$3
echo $sourceEnv
echo $profile
echo $workflow

source  $sourceEnv/activate
cd $workflow
$sourceEnv/snakemake --profile $profile --unlock
$sourceEnv/snakemake --profile $profile 