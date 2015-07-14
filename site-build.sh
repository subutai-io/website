#!/bin/bash
WKDIR=$(dirname $0)
bash devops/scripts/import_content.sh -w $WKDIR
exit

pushd ../project-descriptors
  git checkout master && git pull
popd
  git checkout master && git pull
  git bin --init=s3://subutai-website
  git bin --sync
bash import_content.sh