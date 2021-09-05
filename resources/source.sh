#!/bin/bash
if [ -f ~/.$(basename $SHELL)rc  ]; then
  source ~/.$(basename $SHELL)rc
elif [ -f ~/bash_profile ]; then
  source ~/bash_profile
fi