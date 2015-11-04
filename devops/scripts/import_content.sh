#!/bin/bash

# Generates descriptors and converts them into yaml (markdown for jekyll) files

now=$(date +"%Y-%m-%d")
WKDIR=$(dirname $0)


# flags
while [[ $# > 0 ]]
do
key="$1"

case $key in
  -w|--wkdir)
  WKDIR="$2"
  DESCR_PATH=$WKDIR/project-descriptors;
  shift
  ;;
  -p|--path)
  DESCR_PATH="$2"
  shift
  ;;
  *)
  # unknown option
  ;;
esac
shift
done

# important paths
DEVOPS=$WKDIR/devops/scripts
JEKYLL_DIR=$WKDIR/ssf
PROJECTS_DIR=$DESCR_PATH/projects
MEMBERS_DIR=$DESCR_PATH/generated


if [[ ! -d "$JEKYLL_DIR/_posts" ]]; then
  echo "creating $JEKYLL_DIR/_posts"
  mkdir "$JEKYLL_DIR/_posts"
fi

if [[ ! -d "$JEKYLL_DIR/_posts/members" ]]; then
  echo "creating $JEKYLL_DIR/_posts/members"
  mkdir "$JEKYLL_DIR/_posts/members"
fi

if [[ ! -d "$JEKYLL_DIR/_posts/projects" ]]; then
  echo "creating $JEKYLL_DIR/_posts/projects"
  mkdir "$JEKYLL_DIR/_posts/projects"
fi

if [[ ! -d "$JEKYLL_DIR/img/avatars" ]]; then
  echo "creating $JEKYLL_DIR/img/avatars"
  mkdir "$JEKYLL_DIR/img/avatars"
fi


if [[ -z "$(which curl)" ]]; then
  echo Can not find curl on your PATH
  echo please run apt-get install curl
  exit 1
fi

if [[ -z "$(which jsonnet)" ]]; then
  echo Can not find jsonnet on your PATH
  echo Add to your path or clone, build, and install from
  echo https://github.com/google/jsonnet
  exit 1
fi


echo "Generating project descriptors"
bash $DESCR_PATH/build.sh


echo "Generating members descriptors"
pushd $MEMBERS_DIR
  go run generate.go members teams projects website
popd



# remove existing one and convert from json the new one
rm $JEKYLL_DIR/_posts/members/*

for descriptor in `find $MEMBERS_DIR -type f -regex '.*\.json'`; do
  filename=$(basename $descriptor)
  key=${filename%.json}

  $WKDIR/node_modules/.bin/json2yaml $MEMBERS_DIR/generated/$key.json > $JEKYLL_DIR/_posts/members/$now-$key.markdown
  echo Generated $MEMBERS_DIR/generated/$now-$key.markdown ...
done

rm $JEKYLL_DIR/_posts/projects/*

for descriptor in `find $PROJECTS_DIR -type f -regex '.*\.json'`; do
  filename=$(basename $descriptor)
  key=${filename%.json}

  $WKDIR/node_modules/.bin/json2yaml $PROJECTS_DIR/$key.json > $JEKYLL_DIR/_posts/projects/$now-$key.markdown
  echo Generated $PROJECTS_DIR/$now-$key.markdown ...
done
