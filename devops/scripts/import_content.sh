#!/bin/bash

now=$(date +"%Y-%m-%d")
WKDIR=$(dirname $0)

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

DEVOPS=$WKDIR/devops/scripts
JEKYLL_DIR=$WKDIR/ssf
PROJECTS_DIR=$DESCR_PATH/projects
MEMBERS_DIR=$DESCR_PATH/generated


if [[ ! -d "$JEKYLL_DIR/_posts" ]]; then
  mkdir "$JEKYLL_DIR/_posts"
fi

if [[ ! -d "$JEKYLL_DIR/_posts/members" ]]; then
  mkdir "$JEKYLL_DIR/_posts/members"
fi

if [[ ! -d "$JEKYLL_DIR/_posts/projects" ]]; then
  mkdir "$JEKYLL_DIR/_posts/projects"
fi

if [[ ! -d "$JEKYLL_DIR/img/avatars" ]]; then
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

if [[ -z "$(which node)" ]] || [[ -z "$(which npm)" ]]; then
  echo Can not find nodeJS or npm on your PATH
  echo https://nodejs.org/
  exit 1
fi

if [[ -z "$(which $WKDIR/node_modules/.bin/json2yaml)" ]]; then
  OUTUT="$(npm install json2yaml)"

  if [[ -n "$OUTPUT" ]] && [[ ! "$OUTPUT" =~ "npm ERR!" ]]; then
    echo $OUTPUT
    exit 2;
  fi


  OUTUT="$(npm install node-curl)"

  if [[ -n "$OUTPUT" ]] && [[ ! "$OUTPUT" =~ "npm ERR!" ]]; then
    echo $OUTPUT
    exit 2;
  fi
fi

if [[ -z "$(which $WKDIR/node_modules/.bin/xml2json)" ]]; then
  OUTUT="$(npm install xml2json)"

  if [[ -n "$OUTPUT" ]] && [[ ! "$OUTPUT" =~ "npm ERR!" ]]; then
    echo $OUTPUT
    exit 2;
  fi
fi

if [[ -z "$(which $WKDIR/node_modules/.bin/yaml2json)" ]]; then
  OUTUT="$(npm install yaml-to-json)"

  if [[ -n "$OUTPUT" ]] && [[ ! "$OUTPUT" =~ "npm ERR!" ]]; then
    echo $OUTPUT
    exit 2;
  fi
fi

bash $DESCR_PATH/build.sh

#pushd $MEMBERS_DIR
#  bash generate.sh
#popd

rm $JEKYLL_DIR/_posts/members/*

for descriptor in `find $MEMBERS_DIR -type f -regex '.*\.json'`; do
  filename=$(basename $descriptor)
  key=${filename%.json}

  $WKDIR/node_modules/.bin/json2yaml $MEMBERS_DIR/$key.json > $JEKYLL_DIR/_posts/members/$now-$key.markdown

  result=$(node $DEVOPS/fetchUserInfo.js $key $now)
  wget --user-agent="ssf" --http-user=dashbot --http-password=ghkf346LU538QZRD "$result" -O $JEKYLL_DIR/img/avatars/$key.png
  echo Generated $MEMBERS_DIR/$now-$key.markdown ...
done

rm $JEKYLL_DIR/_posts/projects/*

for descriptor in `find $PROJECTS_DIR -type f -regex '.*\.json'`; do
  filename=$(basename $descriptor)
  key=${filename%.json}

  $WKDIR/node_modules/.bin/json2yaml $PROJECTS_DIR/$key.json > $JEKYLL_DIR/_posts/projects/$now-$key.markdown

  result=$(node $DEVOPS/fetchProjectInfo.js $key $now)

  echo Generated $PROJECTS_DIR/$now-$key.markdown ...
done
