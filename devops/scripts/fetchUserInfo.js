var key = process.argv[2];
var date = process.argv[3];
var filename = key + ".json"
var cn;
var uid;

var DESCRIPTORS_PATH = "/project-descriptors/generated/";
var POSTS_PATH = "/ssf/_posts/members/";

var CONFLUENCE_ACTIVITY = "https://confluence.subutai.io/activity?maxResults=5&streams=user+IS+";
var JIRA_ACTIVITY = "https://jira.subutai.io/rest/api/2/user?key=";

var fs = require("fs");
var parser = require("xml2json");
var CURL = require("node-curl");
var async = require("async");
var util = require("util");
var YAML = require('yamljs');
var J2Y = require('json2yaml');

var profileJSON;
var activityJSON;

var jekyllProperties = {
    "layout" : "profile",
    "categories" : "members"
};


async.parallel([
    function( callback ) {
        fs.readFile( process.cwd() + DESCRIPTORS_PATH + filename, function (err, data) {
            if (err) throw err;

            var infoJSON = JSON.parse(data);
            cn = infoJSON["ldap-user"].cn;
            uid = infoJSON["ldap-user"].uid;

            jekyllProperties.title = cn;
            jekyllProperties.permalink = util.format("/:categories/%s/", uid);
            jekyllProperties.date = util.format("Date.parse(%s)", date);

            callback();
        });
    },
    function( callback ) {
        var curl = CURL.create()
        curl(CONFLUENCE_ACTIVITY + key, {
            USERAGENT: "ssf",
            USERNAME: "dashbot",
            PASSWORD: "ghkf346LU538QZRD"
        }, function(err) {
            if (err) throw err;

            var activity = parser.toJson(this.body);

            activityJSON = JSON.parse( activity );

            this.close()
            callback();
        });
    },
    function( callback ) {
        var curl = CURL.create()
        curl(JIRA_ACTIVITY + key, {
            USERAGENT: "ssf",
            USERNAME: "dashbot",
            PASSWORD: "ghkf346LU538QZRD"
        }, function(err) {
            if (err) throw err;

            profileJSON = JSON.parse( this.body );

            this.close();
            callback();
        });
    }
], function(err) {
    if (err) {
        throw err;
    }

    var profile = {};
    var userProfile = {};

    if (profileJSON.key){
        profile.key = profileJSON.key;
        profile.name = profileJSON.name;
        profile.emailAddress = profileJSON.emailAddress;
        profile.displayName = profileJSON.displayName;
        var userActivity = [];
        var feed = activityJSON.feed;
        if ( feed.entry ){
            for (var i = 0; i < feed.entry.length; i++)
            {
                var activity = {};
                activity.published = feed.entry[i].published;
                activity.updates = feed.entry[i].updated;
                activity.category = feed.entry[i].category;
                activity.summary = feed.entry[i]["activity:object"];
                userActivity.push(activity);
            }
            profile.userActivity = userActivity;
        }
        else {
            profile.userActivity = userActivity;
        }
        userProfile = {}
        userProfile.userProfile = profile;
        appendToLiquid( jsonConcat( userProfile, jekyllProperties ), util.format( "%s-%s.markdown", date, key ) );
    }
});

function appendToLiquid( json, filename ) {
    nativeObject = YAML.load(process.cwd() + POSTS_PATH + filename);

    var output = J2Y.stringify( jsonConcat( nativeObject, json ) );
    output += "\n---"

    fs.writeFile(process.cwd() + POSTS_PATH + filename, output, function(err) {
        if (err) throw err;
    });
}

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}
