#!/bin/bash

PORTS="53 67 80 443 1900 6881 8086 8443 8444"
LSOF=`which lsof`
NETSTAT=`which netstat`

if [ -n "$LSOF" ]; then
  CMD_PREFIX="lsof -i :"
elif [ -n "$NETSTAT" ]; then
  CMD_PREFIX="netstat -lnp | grep \":"
  CMD_SUFFIX=" \""
else
  echo neither netstat or lsof found on path
fi

for port in $PORTS; do
  CMD=$CMD_PREFIX$port$CMD_SUFFIX
  results=`$CMD`
  if [ -n "$results" ]; then
    echo -e "$port \t => \t" bound
  else
    echo -e "$port \t => \t" free
  fi
done

