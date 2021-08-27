#!/bin/bash
sourceEnv=$1
profile=$2
workflow=$3
shell=$4
source .$(basename $shell)rc
source  $sourceEnv/activate
cd $workflow
pwd
# $sourceEnv/snakemake --profile $profile --unlock &> $profile/../../../biseps.txt
$sourceEnv/snakemake --profile $profile --rerun-incomplete  &> $profile/../../../biseps.txt
$sourceEnv/snakemake --profile $profile --report  $profile/../../../report.html  &>> $profile/../../../biseps.txt

