#!/bin/bash
sourceEnv=$1
profile=$2
workflow=$3
shell=$4
unlock=$5
source .$(basename $shell)rc
source  $sourceEnv/activate
cd $workflow
pwd
[ -e $profile/../../../biseps.txt ] && rm -- $profile/../../../biseps.txt
[ -e $profile/../../../failed.lock ] && rm -- $profile/../../../failed.lock
if [[ $unlock ]]; then
$sourceEnv/snakemake --profile $profile --unlock &>> $profile/../../../biseps.txt
fi
$sourceEnv/snakemake --profile $profile --rerun-incomplete  &>> $profile/../../../biseps.txt
$sourceEnv/snakemake --profile $profile --report  $profile/../../../report.html  &>> $profile/../../../biseps.txt
if [ $? -ne 0 ]
then
   touch $profile/../../../failed.lock
fi
