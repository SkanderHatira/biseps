#!/bin/bash
sourceEnv=$1
dbPath=$2


source $sourceEnv
mongod --dbpath $dbPath




