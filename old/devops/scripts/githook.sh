#!/bin/bash

WKDIR=$(dirname $0)

while [[ $# > 0 ]]
do
key="$1"

case $key in
  -w|--wkdir)
  WKDIR="$2"
  shift
  ;;
  *)
  # unknown option
  ;;
esac
shift
done

cp $WKDIR/devops/scripts/git-bin-sync-hook $WKDIR/.git/hooks/pre-push
chmod +x $WKDIR/.git/hooks/pre-push

cp $WKDIR/devops/scripts/git-bin-sync-hook $WKDIR/.git/hooks/post-merge
chmod +x $WKDIR/.git/hooks/post-merge

echo "Git hooks inited"