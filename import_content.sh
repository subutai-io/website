#!/bin/bash

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

if [[ -z "$(which node_modules/.bin/json2yaml)" ]]; then
    OUTUT="$(npm install json2yaml)"

    if [[ -n "$OUTPUT" ]] && [[ ! "$OUTPUT" =~ "npm ERR!" ]]; then
        echo $OUTPUT
        exit 2;
    fi
fi


DESCR_PATH="./../project-descriptors";

while [[ $# > 0 ]]
do
key="$1"

case $key in
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

bash $DESCR_PATH/build.sh

now=$(date +"%Y-%m-%d")
wkdir=$(dirname $0)
projects_dir=$DESCR_PATH/projects
teams_dir=$DESCR_PATH/teams


for descriptor in `find $projects_dir -type f -regex '.*\.json'`; do
  filename=$(basename $descriptor)
  key=${filename%.json}

  project_name=$(node -pe 'JSON.parse(process.argv[1]).name' "$(cat $projects_dir/$key.json)")
  url=$(node -pe 'JSON.parse(process.argv[1]).website.website' "$(cat $projects_dir/$key.json)")
  parent=$(node -pe 'JSON.parse(process.argv[1]).parent' "$(cat $projects_dir/$key.json)")

  if [ -n '$parent' ] && [ "$parent" != "undefined" ]; then
    pkey=${parent%.json}
    parent=$(node -pe 'JSON.parse(process.argv[1]).website.website' "$(cat $projects_dir/$pkey.json)")
  else
    parent=''
  fi

  node_modules/.bin/json2yaml $projects_dir/$key.json > $projects_dir/$now-$key.markdown
  sed -i 's/categories/tags/g' $projects_dir/$now-$key.markdown
  cat << EOF >> $projects_dir/$now-$key.markdown

  parenturl: $parent
  layout: post
  title:  "$project_name"
  date:   Date.parse('$now')
  categories: projects
  permalink: /:categories/$url/
---
EOF

  echo Generated $projects_dir/$now-$key.markdown ...
done

mkdir $

rm $wkdir/_posts/projects/*

mv $projects_dir/*.markdown $wkdir/_posts/projects
