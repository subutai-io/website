#!/bin/bash

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
