#!/bin/bash
#SBATCH --job-name=smkFull
#SBATCH --ntasks=1
#SBATCH --mem-per-cpu=100
#SBATCH --output=last.txt
sourceEnv=$1
profile=$2
workflow=$3
conda=$4
which conda
which python
source $conda
source  $sourceEnv/activate
cd $workflow
time $sourceEnv/snakemake --profile $profile --unlock
time $sourceEnv/snakemake --profile $profile --rerun-incomplete