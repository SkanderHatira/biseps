#!/bin/bash
sourceEnv=$1
port=$2
dbpath=$3
unixSocket=$4

source $sourceEnv/activate
$sourceEnv/mongod  --port $port --dbpath $dbpath --bind_ip $unixSocket 





