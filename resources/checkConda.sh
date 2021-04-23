#!/bin/bash

if ! [ "$(command -v conda)" ]; then
  echo 'Error: Please Make Sure conda is in your $PATH.' >&2
fi
