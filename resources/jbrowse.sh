#!/bin/bash

outdir=$1
genomes=$2
bams=$3
workflow=$4
port=$5

echo "inside script jbrowse"
echo $outdir
echo $genomes
echo $bams
echo $workflow
echo $port
echo $jbrowse
cp -r $workflow $outdir
command -v jbrowse
cd $outdir 
pwd
for genome in $genomes
do
echo $genome
jbrowse add-assembly $genome --load copy --out .
done
for bam in $bams
do
jbrowse add-assembly $bam --load copy --out .
done
