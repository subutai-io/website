var fs = require("fs");
var parser = require("xml2json");
var CURL = require("node-curl");
var async = require("async");
var util = require("util");
var yaml2json = require('yaml-to-json');
var J2Y = require('json2yaml');


var filename = process.argv[2];


//var CONFLUENCE_ACTIVITY = "https://confluence.subutai.io/activity?maxResults=5&streams=user+IS+%s";
var JIRA_ACTIVITY = "https://jira.subutai.io/rest/api/2/user?key=%s";
var DEFAULT_IMG = "https://jira.subutai.io/secure/useravatar?avatarId=10122";


var nativeObject;

var jekyllProperties = {
    "layout" : "profile",
    "categories" : "members"
};

// read markdown and parse to json
fs.readFile( process.cwd() + filename, function (err, data) {
    if (err) throw err;


    // remove markdowns at the end of file if exists to make it yaml
    var detectLiquid = data.toString().lastIndexOf("---");
    if ( detectLiquid + 5 >= data.length ) {
        data = data.toString().substring(0, detectLiquid);
    }

    if( data.length == 0 ) {
        fs.unlink( process.cwd() + filename );
        return;
    }

    nativeObject = yaml2json(data);
    nativeObject = nativeObject[0]; // @todo workaround @important! might be useless after library upgrade

    if( nativeObject.bot == "true" ) {
        fs.unlink( process.cwd() + filename );
        return;
    }


    // get date from the filename
    var dateParts = filename.split("-");
    if( dateParts < 4 ) {
        return;
    }

    var date = "";
    for( var i = dateParts.length - 2, it = 0; i >= 0 && it < 3; i--, it++ ) {
        date = "-" + dateParts[i] + date;
    }

    date = date.split("/");
    date = date[date.length - 1];
    // date retrieved


    var cn = nativeObject["ldap-user"].cn;
    var uid = nativeObject["ldap-user"].uid;

    jekyllProperties.title = cn;
    jekyllProperties.permalink = util.format("/:categories/%s/", uid);
    jekyllProperties.date = util.format("Date.parse(%s)", date);

    parallel( uid );
});

// make curl rest calls in parallel
function parallel( uid ) {
    var profileJSON;

    async.parallel([
        function (callback) {
            var curl = CURL.create();
            curl( util.format(JIRA_ACTIVITY, uid), {
                USERAGENT: "ssf"
                ,USERNAME: "websitebot"
                ,PASSWORD: "W$bot0-"
            }, function (err) {
                if (err) throw err;

                profileJSON = JSON.parse(this.body);

                this.close();

                callback();
            });
        }
    ], function (err) {
        if (err) {
            throw err;
        }

        if( !profileJSON.avatarUrls || !profileJSON.avatarUrls["48x48"] )
            console.log( DEFAULT_IMG );
        else
            console.log( profileJSON.avatarUrls["48x48"] );

        appendToLiquid( jekyllProperties );
    });
}

function appendToLiquid( json ) {

    var output = J2Y.stringify( jsonConcat(nativeObject, json) );
    output += "\n---";

    fs.writeFile(process.cwd() + filename, output, function (err) {
        if (err) throw err;
    });
}

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}
