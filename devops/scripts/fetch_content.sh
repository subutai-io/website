#!/bin/bash

# Fetches content from confluence jira and stash, then updates existing markdown files (projects, members)

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
PROJECTS_DIR=$JEKYLL_DIR/_posts/projects
MEMBERS_DIR=$JEKYLL_DIR/_posts/members


if [[ -z "$(which node)" ]] || [[ -z "$(which npm)" ]]; then
  echo Can not find nodeJS or NPM on your PATH
  echo https://nodejs.org/
  exit 1
fi

# check and install nodejs dependencies
if [[ -z "$(which $WKDIR/node_modules/.bin/json2yaml)" ]]; then
  OUTUT="$(npm install json2yaml)"

  if [[ -n "$OUTPUT" ]] && [[ ! "$OUTPUT" =~ "npm ERR!" ]]; then
    echo $OUTPUT
    exit 2;
  fi


  OUTUT="$(npm install node-libcurl)"

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

if [[ -z "$(which $WKDIR/node_modules/.bin/yaml-to-json)" ]]; then
  OUTUT="$(npm install yaml-to-json)"

  if [[ -n "$OUTPUT" ]] && [[ ! "$OUTPUT" =~ "npm ERR!" ]]; then
    echo $OUTPUT
    exit 2;
  fi
fi


# Update descriptors
mkdir $JEKYLL_DIR/media/avatars
for descriptor in `find $MEMBERS_DIR -type f -regex '.*\.markdown'`; do

  filename=$(basename $descriptor)
  key=${filename%.json}
  key=$(echo $key | cut -c 12- | sed -r 's/.markdown//g')
#  userActivity=$(curl -u dashbot:ghkf346LU538QZRD -X GET 'https://confluence.subutai.io/activity?maxResults=5&streams=user+IS+'$key'' -A 'ssf')
#  echo $userActivity
#  userProfile=$(curl -u dashbot:ghkf346LU538QZRD -X GET 'https://jira.subutai.io/rest/api/2/user?key='$key'' -A 'ssf')
#  echo $userProfile


  result=$(node $DEVOPS/fetchUserInfo.js ${descriptor:1})
  echo $key
    echo $result
#  Download avatars
#  wget --user-agent="ssf" --http-user=websitebot --http-password=W$bot0- $result -O $JEKYLL_DIR/media/avatars/$key.png
  echo Updated $descriptor ...
done

#for descriptor in `find $PROJECTS_DIR -type f -regex '.*\.markdown'`; do
#  filename=$(basename $descriptor)
#
#  result=$(node $DEVOPS/fetchProjectInfo.js ${descriptor:1})
#
#  echo Updated $descriptor ...
#done
#
#node $DEVOPS/countUsers.js