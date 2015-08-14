var key = process.argv[2];
var date = process.argv[3];
var filename = key + ".json";
var projectName;
var url;
var parent;

var DESCRIPTORS_PATH = "/project-descriptors/projects/";
var POSTS_PATH = "/ssf/_posts/projects/";

var URL_LAST_UPDATES = "https://confluence.subutai.io/rest/api/content/search?cql=lastModified%3E=now(%22-15d%22)%20and%20space=%s"
var URL_COMMITS = "https://stash.subutai.io/rest/api/1.0/projects/%s/repos/main/commits/?until=master"
var URL_BLOGS = "https://confluence.subutai.io/rest/api/content?type=blogpost&spaceKey=%s"

var fs = require("fs");
var CURL = require("node-curl");
var async = require("async");
var util = require("util");
var yaml2json = require('yaml-to-json');
var J2Y = require('json2yaml');


var jekyllProperties = {
    "layout" : "post",
    "categories" : "projects"
};

async.parallel([
    function( callback ) {
        fs.readFile( process.cwd() + DESCRIPTORS_PATH + filename, function (err, data) {
            if (err) throw err;

            var infoJSON = JSON.parse(data);

            projectName = infoJSON.name;
            url = infoJSON.website.website;
            parent = infoJSON.parent;


            jekyllProperties.title = projectName;
            jekyllProperties.permalink = util.format("/:categories/%s/", url);
            jekyllProperties.date = util.format("Date.parse(%s)", date);

            callback();
        });
    },
    function  ( callback ) {
        var curl = CURL.create()
        curl(util.format(URL_LAST_UPDATES, key), {
            USERAGENT: "ssf",
            USERNAME: "dashbot",
            PASSWORD: "ghkf346LU538QZRD"
        }, function(err) {
            if (err) throw err;

            var updatesJSON =  JSON.parse( this.body );
            var lastUpdates = [];
            var lastUpdate = {};
            if ( updatesJSON.results ){
                for (var j = 0; j < updatesJSON.results.length; j++){
                    var lUpd = {};
                    lUpd.id = updatesJSON.results[j].id;
                    lUpd.type = updatesJSON.results[j].type;
                    lUpd.title = updatesJSON.results[j].title;
                    lUpd.url="https://confluence.subutai.io" + updatesJSON.results[j]._links.webui;
                    lastUpdates.push(lUpd);
                }
                lastUpdate = {};
                lastUpdate.lastUpdates = lastUpdates;
            }

            jekyllProperties = jsonConcat( lastUpdate, jekyllProperties );

            this.close();
            callback();
        });
    },
    function( callback ) {
        var curl = CURL.create()
        curl(util.format(URL_COMMITS, key), {
            USERAGENT: "ssf",
            USERNAME: "dashbot",
            PASSWORD: "ghkf346LU538QZRD"
        }, function(err) {
            if (err) throw err;

            var commitsJSON = JSON.parse( this.body );
            var commits = [];
            var commit = {};
            if ( commitsJSON.values ){
                for (var j = 0; j < commitsJSON.values.length; j++) {
                    var cmt = {};
                    cmt.id = commitsJSON.values[j].id;
                    cmt.message = commitsJSON.values[j].message;
                    cmt.author = commitsJSON.values[j].author.name;
                    cmt.displayId = commitsJSON.values[j].displayId;
                    cmt.url = "https://stash.subutai.io/projects/'$key'/repos/main/commits/"+cmt.id;
                    commits.push(cmt);
                }
                commit = {};
                commit.commits = commits;
            }

            jekyllProperties = jsonConcat( commit, jekyllProperties );

            this.close();
            callback();
        });
    },
    function( callback ) {
        var curl = CURL.create()
        curl(util.format(URL_BLOGS, key), {
            USERAGENT: "ssf",
            USERNAME: "dashbot",
            PASSWORD: "ghkf346LU538QZRD"
        }, function(err) {
            if (err) throw err;

            var blogJSON = JSON.parse( this.body );
            var blogs = [];
            var blog = {};
            if ( blogJSON.results ){
                for (var i = 0; i < blogJSON.results.length; i++){
                    var blog = {};
                    blog.title = blogJSON.results[i].title;
                    blog.url = "https://confluence.subutai.io" + blogJSON.results[i]._links.webui;
                    blogs.push(blog);
                }
                blog = {};
                blog.blogs = blogs;
            }

            jekyllProperties = jsonConcat( blog, jekyllProperties );

            this.close()
            callback();
        });
    },
], function( err ) {
    if( parent ) {
        fs.readFile( process.cwd() + DESCRIPTORS_PATH + parent + ".json", function (err, data) {
            if (err) throw err;

            var infoJSON = JSON.parse(data);

            jekyllProperties.parenturl = infoJSON.website.website;

            appendToLiquid( jekyllProperties, util.format( "%s-%s.markdown", date, key ) );
        });
    }
    else {
        appendToLiquid( jekyllProperties, util.format( "%s-%s.markdown", date, key ) );
    }
});

function appendToLiquid( json, filename ) {
    fs.readFile( process.cwd() + POSTS_PATH + filename, function (err, data) {
        if (err) throw err;

        var nativeObject = yaml2json(data);


        var output = J2Y.stringify( jsonConcat( nativeObject[0], json ) );

        fs.writeFile(process.cwd() + POSTS_PATH + filename, output, function(err) {
            if (err) throw err;
        });
    });
}

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}
