#!/bin/bash
rootPath=$1
echo "no need for this"
echo "no need for this"
echo "no need for this"
echo "no need for this"

# chmod -R 755 $rootPath/resources/database/mongo
# chmod -R 755 $rootPath/resources/linux/snakemake
if ! [ "$(command -v conda)" ]; then
  echo 'Error: conda is not installed.' >&2
  # install conda
  # download miniconda
  wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh -O $rootPath/miniconda.sh ;
  bash $rootPath/miniconda.sh -b -p ;
  rm $rootPath/miniconda.sh;
fi
