#!/bin/bash

now=$(date +"%Y-%m-%d")
WKDIR=$(dirname $0)
DESCR_PATH=$WKDIR/../project-descriptors;

while [[ $# > 0 ]]
do
key="$1"

case $key in
    -p|--path)
    DESCR_PATH="$2"
    shift
    ;;
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
  userActivity=$(curl -u dashbot:ghkf346LU538QZRD -X GET 'https://confluence.subutai.io/activity?maxResults=5&streams=user+IS+'$key'' -A 'ssf')
  echo $userActivity > $DESCR_PATH/userActivity.xml
  cat "$DESCR_PATH"/userActivity.xml | $WKDIR/node_modules/.bin/xml2json > $DESCR_PATH/userActivity.json
  userActivity=$(cat "$DESCR_PATH"/userActivity.json)
  userProfile=$(curl -u dashbot:ghkf346LU538QZRD -X GET 'https://jira.subutai.io/rest/api/2/user?key='$key'' -A 'ssf')

  userAvatar=$(node -pe '
            var url = '"$userProfile"'.avatarUrls["48x48"];
            url;
           ')

  wget --user-agent="ssf" --http-user=dashbot --http-password=ghkf346LU538QZRD "$userAvatar" -O $JEKYLL_DIR/img/avatars/$key.png

  userProfile=$(node -pe '
            var profile = {};
            var userProfile = {};
            if ('"$userProfile"'.key){
                profile.key='"$userProfile"'.key;
                profile.name='"$userProfile"'.name;
                profile.emailAddress='"$userProfile"'.emailAddress;
                profile.displayName='"$userProfile"'.displayName;
                var userActivity = [];
                var feed = '"$userActivity"'.feed;
                if (feed.entry){
                    for (var i=0; i<feed.entry.length; i++)
                    {
                        var activity = {};
                        activity.published=feed.entry[i].published;
                        activity.updates=feed.entry[i].updated;
                        activity.category=feed.entry[i].category;
                        activity.summary=feed.entry[i]["activity:object"];
                        userActivity.push(activity);
                    }
                    profile.userActivity = userActivity;
                }
                else {
                    profile.userActivity = userActivity;
                }

                userProfile.userProfile = profile;
                JSON.stringify(userProfile);
            }
            else {
                JSON.stringify(userProfile);
            }
           ')
  echo $userProfile > $DESCR_PATH/userProfile.json
  userProfile=$($WKDIR/node_modules/.bin/json2yaml "$DESCR_PATH"/userProfile.json)
  userProfile=${userProfile:4}
  $WKDIR/node_modules/.bin/json2yaml $MEMBERS_DIR/$key.json > $MEMBERS_DIR/$now-$key.markdown
  sed -i 's/categories/tags/g' $MEMBERS_DIR/$now-$key.markdown
  cat << EOF >> $MEMBERS_DIR/$now-$key.markdown
$userProfile
  layout: profile
  title:  "$cn"
  date:   Date.parse('$now')
  categories: members
  permalink: /:categories/$uid/
---
EOF

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
  lastUpdates=$(curl -u dashbot:ghkf346LU538QZRD -X GET 'https://confluence.subutai.io/rest/api/content/search?cql=lastModified%3E=now(%22-5d%22)%20and%20space='$key'' -A 'ssf')
  lastUpdates=$(node -pe '
            var lastUpdates=[];
            var lastUpdate = {};
            if ('"$lastUpdates"'.results){
                for (var j=0; j<'"$lastUpdates"'.results.length; j++){
                var lUpd={};
                lUpd.id='"$lastUpdates"'.results[j].id;
                lUpd.type='"$lastUpdates"'.results[j].type;
                lUpd.title='"$lastUpdates"'.results[j].title;
                lUpd.url="https://confluence.subutai.io"+'"$lastUpdates"'.results[j]._links.webui;
                lastUpdates.push(lUpd);
                }
                lastUpdate.lastUpdates=lastUpdates;
                JSON.stringify(lastUpdate);
            }
            else {
                lastUpdate.lastUpdates=[];
                JSON.stringify(lastUpdate);
            }
           ')
  echo $lastUpdates > $DESCR_PATH/lastUpdates.json
  lastUpdates=$($WKDIR/node_modules/.bin/json2yaml "$DESCR_PATH"/lastUpdates.json)
  lastUpdates=${lastUpdates:4}


  commits=$(curl -u dashbot:ghkf346LU538QZRD -X GET 'https://stash.subutai.io/rest/api/1.0/projects/'$key'/repos/main/commits/?until=master' -A 'ssf')
  commits=$(node -pe '
            var commits=[];
            var commit = {};
            if ('"$commits"'.values){
                for (var j=0; j<'"$commits"'.values.length; j++){
                var cmt={};
                cmt.id='"$commits"'.values[j].id;
                cmt.message='"$commits"'.values[j].message;
                cmt.author='"$commits"'.values[j].author.name;
                cmt.displayId='"$commits"'.values[j].displayId;
                cmt.url="https://stash.subutai.io/projects/'$key'/repos/main/commits/"+cmt.id;
                commits.push(cmt);
                }
                commit.commits=commits;
                JSON.stringify(commit);
            }
            else {
                commit.commits=[];
                JSON.stringify(commit);
            }
           ')
  echo $commits > $DESCR_PATH/commits.json
  commits=$($WKDIR/node_modules/.bin/json2yaml "$DESCR_PATH"/commits.json)
  commits=${commits:4}

  blog=$(curl -u dashbot:ghkf346LU538QZRD -X GET 'https://confluence.subutai.io/rest/api/content?type=blogpost&spaceKey='$key'' -A 'ssf')
  blogs=$(node -pe '
                var blogs=[];
                var blog2 = {};
                if ('"$blog"'.results){
                    for (var i=0; i<'"$blog"'.results.length; i++){
                    var blog={};
                    blog.title = '"$blog"'.results[i].title;
                    blog.url = "https://confluence.subutai.io" + '"$blog"'.results[i]._links.webui;
                    blogs.push(blog);
                    }
                    blog2.blogs = blogs;
                    JSON.stringify(blog2);
                }
                else {
                    blog2.blogs = [];
                    JSON.stringify(blog2);
                }
                ')
  echo $blogs > $DESCR_PATH/blogs.json
  blogs=$($WKDIR/node_modules/.bin/json2yaml "$DESCR_PATH"/blogs.json)
  blogs=${blogs:4}

  if [ -n '$parent' ] && [ "$parent" != "undefined" ]; then
    pkey=${parent%.json}
    parent=$(node -pe 'JSON.parse(process.argv[1]).website.website' "$(cat $PROJECTS_DIR/$pkey.json)")
  else
    parent=''
  fi

  $WKDIR/node_modules/.bin/json2yaml $PROJECTS_DIR/$key.json > $PROJECTS_DIR/$now-$key.markdown
  sed -i 's/categories/tags/g' $PROJECTS_DIR/$now-$key.markdown
  cat << EOF >> $PROJECTS_DIR/$now-$key.markdown

$lastUpdates
$commits
$blogs
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
