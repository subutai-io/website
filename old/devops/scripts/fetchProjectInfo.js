var fs = require("fs");
var Curl = require("node-libcurl").Curl;
var async = require("async");
var util = require("util");
var yaml2json = require('yaml-to-json');
var J2Y = require('json2yaml');


var filename = process.argv[2];


var URL_LAST_UPDATES = "https://confluence.subutai.io/rest/api/content/search?cql=lastModified%3E=now(%22-15d%22)%20and%20space=%s&limit=10";
var URL_COMMITS = "https://stash.subutai.io/rest/api/1.0/projects/%s/repos/main/commits/?until=master&limit=10";
var URL_BLOGS = "https://confluence.subutai.io/rest/api/content?type=blogpost&spaceKey=%s";

var nativeObject;

var jekyllProperties = {
    "layout": "post",
    "categories": "projects"
};

// read markdown and parse to json
fs.readFile(process.cwd() + filename, function (err, data) {
    if (err) throw err;


    // remove markdowns at the end of file if exists to make it yaml
    var detectLiquid = data.toString().lastIndexOf("---");
    if (detectLiquid + 5 >= data.length) {
        data = data.toString().substring(0, detectLiquid);
    }

    nativeObject = yaml2json(data);
    nativeObject = nativeObject[0]; // @todo workaround @important! might be useless after library upgrade

    // get date from the filename
    var dateParts = filename.split("-");
    if (dateParts < 4) {
        return;
    }

    var date = "";
    for (var i = dateParts.length - 2, it = 0; i >= 0 && it < 3; i--, it++) {
        date = "-" + dateParts[i] + date;
    }

    date = date.split("/");
    date = date[date.length - 1];
    // date retrieved

    // get confluence and stash keys
    var cf = undefined;

    if (nativeObject.confluence && nativeObject.confluence.spaces) {
        for (var i = 0; i < nativeObject.confluence.spaces.length; i++) {
            if (nativeObject.confluence.spaces[i].scope == "public" && cf != nativeObject.key) {
                cf = nativeObject.confluence.spaces[i].key;
            }
        }
    }


    var stash = undefined;

    if (nativeObject.stash && nativeObject.stash.projects) {
        for (var i = 0; i < nativeObject.stash.projects.length; i++) {
            if (nativeObject.stash.projects[i].scope == "public" && stash != nativeObject.key) {
                stash = nativeObject.stash.projects[i].key;
            }
        }
    }


    var projectName = nativeObject.name;
    var url = nativeObject.website.website;


    jekyllProperties.title = projectName;
    jekyllProperties.permalink = util.format("/:categories/%s/", url);
    jekyllProperties.date = util.format("Date.parse(%s)", date);

    parallel(cf, stash);
});

// make curl rest calls in parallel
function parallel(cf, stash) {
    async.parallel([
        function (callback) {

            if (cf === undefined) {
                callback();
                return
            }


            var curl = new Curl();

            curl.setOpt('URL', util.format(URL_LAST_UPDATES, cf));
            curl.setOpt('USERAGENT', "ssf");
            curl.perform();

            curl.on('end', function (statusCode, body, headers) {

                var updatesJSON = JSON.parse(body);
                var lastUpdates = [];
                var lastUpdate = {};
                if (updatesJSON.results) {
                    for (var j = 0; j < updatesJSON.results.length; j++) {
                        var lUpd = {};
                        lUpd.id = updatesJSON.results[j].id;
                        lUpd.type = updatesJSON.results[j].type;
                        lUpd.title = updatesJSON.results[j].title;
                        lUpd.url = "https://confluence.subutai.io" + updatesJSON.results[j]._links.webui;
                        lastUpdates.push(lUpd);
                    }
                    lastUpdate = {};
                    lastUpdate.lastUpdates = lastUpdates;
                }

                jekyllProperties = jsonConcat(lastUpdate, jekyllProperties);

                this.close();
                callback();
            });

            curl.on('error', function () {
                curl.close.bind(curl);
                console.log(util.inspect(arguments));
                this.close();
            });
        },
        function (callback) {

            if (stash === undefined) {
                callback();
                return
            }


            var curl = new Curl();

            curl.setOpt('URL', util.format(URL_COMMITS, stash));
            curl.setOpt('USERAGENT', "ssf");
            curl.perform();

            curl.on('end', function (statusCode, body, headers) {

                var commitsJSON = JSON.parse(body);
                var commits = [];
                var commit = {};
                if (commitsJSON.values) {
                    for (var j = 0; j < commitsJSON.values.length; j++) {
                        var cmt = {};
                        cmt.id = commitsJSON.values[j].id;
                        cmt.message = commitsJSON.values[j].message;
                        cmt.author = commitsJSON.values[j].author.name;
                        cmt.displayId = commitsJSON.values[j].displayId;
                        cmt.url = util.format("https://stash.subutai.io/projects/%s/repos/main/commits/%s", stash, cmt.id);
                        commits.push(cmt);
                    }
                    commit = {};
                    commit.commits = commits;
                }

                jekyllProperties = jsonConcat(commit, jekyllProperties);


                this.close();
                callback();
            });

            curl.on('error', function () {
                curl.close.bind(curl);
                console.log(util.inspect(arguments));
                this.close();
            });
        },
        function (callback) {

            if (stash === undefined) {
                callback();
                return
            }

            var curl = new Curl();

            curl.setOpt('URL', util.format(URL_BLOGS, cf));
            curl.setOpt('USERAGENT', "ssf");
            curl.perform();

            curl.on('end', function (statusCode, body, headers) {

                var blogJSON = JSON.parse(body);

                var blogs = [];
                var blog = {};
                if (blogJSON.results) {
                    for (var i = 0; i < blogJSON.results.length; i++) {
                        var blog = {};
                        blog.title = blogJSON.results[i].title;
                        blog.url = "https://confluence.subutai.io" + blogJSON.results[i]._links.webui;
                        blogs.push(blog);
                    }
                    blog = {};
                    blog.blogs = blogs;
                }

                jekyllProperties = jsonConcat(blog, jekyllProperties);

                this.close();
                callback();
            });

            curl.on('error', function () {
                curl.close.bind(curl);
                console.log(util.inspect(arguments));
                this.close();
            });
        },
    ], function (err) {
        appendToLiquid(jekyllProperties);
    });
}

function appendToLiquid(json) {

    var output = J2Y.stringify(jsonConcat(organizeMembers(nativeObject), json));
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


function organizeMembers(json) {
    var teams = {};
    teams.admins = [];
    for (var i = 0; i < json.security.admins.length; i++) {
        var tmp = inspectTeams(json.security.admins[i]);
        addInNotExist(teams.admins, tmp);
    }

    teams.developers = [];
    for (var i = 0; i < json.security.developers.length; i++) {
        tmp = inspectTeams(json.security.developers[i]);
        addInNotExist(teams.developers, tmp);
    }

    teams.lead = [];
    for (var i = 0; i < json.security.lead.length; i++) {
        tmp = inspectTeams(json.security.lead[i]);
        addInNotExist(teams.lead, tmp);
    }

    json.security = teams;

    return json;
}

function inspectTeams(json) {
    var array = new Array(0);
    if (json.members) {
        array = json.members;
    }

    if (json.teams) {
        for (var i = 0; i < json.teams.length; i++) {
            var newArray = inspectTeams(json.teams[i]);

            addInNotExist(array, newArray);
        }
    }

    if (json["ldap-user"]) {
        array.push(json);
    }

    return array;
}

function addInNotExist(initArr, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arrayObjectIndexOf(initArr, arr[i], "ldap-user") == -1) {
            initArr.push(arr[i]);
        }
    }
}

function arrayObjectIndexOf(myArray, searchTerm, property) {
    for (var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property]["uid"] == searchTerm[property]["uid"]) return i;
    }
    return -1;
}