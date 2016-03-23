#!/bin/bash
WKDIR=$(dirname $0)
path=$WKDIR/project-descriptors
if [[ ! -d "$WKDIR/project-descriptors" ]]; then
  echo "Cannot find descriptors $WKDIR/project-descriptors"
  echo "Input a path to descriptors"

  read path

  if [[ ! -d "$path" ]]; then
    echo "Folder doesn't exist"
    exit
  fi
fi

#git checkout master && git pull

if [[ ! -d "$WKDIR/.git/bin-cache" ]]; then
  echo "hooks added"
  bash devops/scripts/githook.sh -w $WKDIR
  echo "Git bin inited"
  git bin --init=s3://subutai-website
  git bin --sync
fi


#pushd $path
#  git checkout master && git pull
#popd

bash devops/scripts/import_content.sh -w $WKDIR -p $path
bash devops/scripts/fetch_content.sh -w $WKDIR -p $path
