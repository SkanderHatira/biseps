#!/bin/bash
id -u
echo $0
# env
echo "#######################"
if ! [ "$(command -v conda)" ]; then
if [ -f $HOME/miniconda3/etc/profile.d/conda.sh ]
then
  source $HOME/miniconda3/etc/profile.d/conda.sh
  if ! [ "$(command -v conda)" ]; then
  echo 'Error: Please Make Sure conda is in your $PATH.' >&2
fi
fi
fi
