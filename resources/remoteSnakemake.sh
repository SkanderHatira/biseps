#!/bin/bash
sourceEnv=$1
profile=$2
workflow=$3
shell=$4
source .$(basename $shell)rc
source  $sourceEnv/activate
cd $workflow
# $sourceEnv/snakemake --profile $profile --unlock
$sourceEnv/snakemake --profile $profile --archive workflow.tar.gz
touch archive.lock