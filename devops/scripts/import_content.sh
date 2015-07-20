#!/bin/bash

now=$(date +"%Y-%m-%d")
WKDIR=$(dirname $0)
DEVOPS=$WKDIR/devops/scripts

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

JEKYLL_DIR=$WKDIR/ssf
PROJECTS_DIR=$DESCR_PATH/projects
MEMBERS_DIR=$DESCR_PATH/generated/members


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
fi

if [[ -z "$(which $WKDIR/node_modules/.bin/xml2json)" ]]; then
  OUTUT="$(npm install xml2json)"

  if [[ -n "$OUTPUT" ]] && [[ ! "$OUTPUT" =~ "npm ERR!" ]]; then
    echo $OUTPUT
    exit 2;
  fi
fi

bash $DESCR_PATH/build.sh
bash $MEMBERS_DIR/generate.sh

for descriptor in `find $MEMBERS_DIR -type f -regex '.*\.json'`; do
  filename=$(basename $descriptor)
  key=${filename%.json}

  cn=$(node -pe 'JSON.parse(process.argv[1])["ldap-user"].cn' "$(cat $MEMBERS_DIR/$key.json)")
  uid=$(node -pe 'JSON.parse(process.argv[1])["ldap-user"].uid' "$(cat $MEMBERS_DIR/$key.json)")

  userActivity=$(curl -u dashbot:ghkf346LU538QZRD -X GET "https://confluence.subutai.io/activity?maxResults=5&streams=user+IS+$key" -A 'ssf' | $WKDIR/node_modules/.bin/xml2json)
  userProfile=$(curl -u dashbot:ghkf346LU538QZRD -X GET "https://jira.subutai.io/rest/api/2/user?key=$key" -A 'ssf')
  userAvatar=$(node -pe 'JSON.parse(process.argv[1]).avatarUrls["48x48"]' "$(echo $userProfile)")

  userProfile=$(node userJSONConv.js "$userProfile" "$userActivity" | $WKDIR/node_modules/.bin/json2yaml )

  $WKDIR/node_modules/.bin/json2yaml $MEMBERS_DIR/$key.json > $MEMBERS_DIR/$now-$key.markdown

  cat << EOF >> $MEMBERS_DIR/$now-$key.markdown

${userProfile:4}
  layout: profile
  title:  "$cn"
  date:   Date.parse('$now')
  categories: members
  permalink: /:categories/$uid/
---
EOF
  wget --user-agent="ssf" --http-user=dashbot --http-password=ghkf346LU538QZRD "$userAvatar" -O $JEKYLL_DIR/img/avatars/$key.png
  echo Generated $MEMBERS_DIR/$now-$key.markdown ...
done


rm JEKYLL_DIR/_posts/members/*
mv $MEMBERS_DIR/*.markdown $JEKYLL_DIR/_posts/members


for descriptor in `find $PROJECTS_DIR -type f -regex '.*\.json'`; do
  filename=$(basename $descriptor)
  key=${filename%.json}

  project_name=$(node -pe 'JSON.parse(process.argv[1]).name' "$(cat $PROJECTS_DIR/$key.json)")
  url=$(node -pe 'JSON.parse(process.argv[1]).website.website' "$(cat $PROJECTS_DIR/$key.json)")
  parent=$(node -pe 'JSON.parse(process.argv[1]).parent' "$(cat $PROJECTS_DIR/$key.json)")

  lastUpdates=$(curl -u dashbot:ghkf346LU538QZRD -X GET "https://confluence.subutai.io/rest/api/content/search?cql=lastModified%3E=now(%22-15d%22)%20and%20space=$key" -A 'ssf')
  lastUpdates=$(node projectUpdatesConv.js "$lastUpdates" | $WKDIR/node_modules/.bin/json2yaml)

  commits=$(curl -u dashbot:ghkf346LU538QZRD -X GET "https://stash.subutai.io/rest/api/1.0/projects/$key/repos/main/commits/?until=master" -A 'ssf')
  commits=$(node projectCommitsConv.js "$commits" | $WKDIR/node_modules/.bin/json2yaml)

  blogs=$(curl -u dashbot:ghkf346LU538QZRD -X GET "https://confluence.subutai.io/rest/api/content?type=blogpost&spaceKey=$key" -A 'ssf')
  blogs=$(node projectBlogsConv.js "$blogs" | $WKDIR/node_modules/.bin/json2yaml)

  if [ -n '$parent' ] && [ "$parent" != "undefined" ]; then
    pkey=${parent%.json}
    parent=$(node -pe 'JSON.parse(process.argv[1]).website.website' "$(cat $PROJECTS_DIR/$pkey.json)")
  else
    parent=''
  fi

  $WKDIR/node_modules/.bin/json2yaml $PROJECTS_DIR/$key.json > $PROJECTS_DIR/$now-$key.markdown
  sed -i 's/categories/tags/g' $PROJECTS_DIR/$now-$key.markdown
  cat << EOF >> $PROJECTS_DIR/$now-$key.markdown

${lastUpdates:4}
${commits:4}
${blogs:4}
  parenturl: $parent
  layout: post
  title:  "$project_name"
  date:   Date.parse('$now')
  categories: projects
  permalink: /:categories/$url/
---
EOF

  echo Generated $PROJECTS_DIR/$now-$key.markdown ...
done

rm $JEKYLL_DIR/_posts/projects/*

mv $PROJECTS_DIR/*.markdown $JEKYLL_DIR/_posts/projects
