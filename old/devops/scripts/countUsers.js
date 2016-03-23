var fs = require("fs");
var yaml2json = require('yaml-to-json');

var PATH = "/ssf/_posts/projects/";
var PATH_TO_INGOT = "/devops/scripts/usersAmount.js";
var PATH_TO_JS = "/ssf/js/usersAmount.js";

var files = fs.readdirSync(process.cwd() + PATH);
var members = {};
var projects = {};
members["all"] = [];

for (var i = 0; i < files.length; i++) {
    var content = fs.readFileSync(process.cwd() + PATH + files[i]);
    var jsonConverted = yaml2json(content);
    var json = jsonConverted[0];


    if (json.security) {
        for (var j = 0; j < json.security.admins.length; j++) {
            if (json.security.admins[j].bot == "false") {
                var member = json.security.admins[j]["ldap-user"].uid;
                filterByTags(json.tags, member);

                if (!projects[json.website.website]) {
                    projects[json.website.website] = [];
                }

                if (projects[json.website.website].indexOf(member) == -1) {
                    projects[json.website.website].push(member);
                }
            }
        }
        for (var j = 0; j < json.security.developers.length; j++) {
            if (json.security.developers[j].bot == "false") {
                var member = json.security.developers[j]["ldap-user"].uid;
                filterByTags(json.tags, member);

                if (!projects[json.website.website]) {
                    projects[json.website.website] = [];
                }

                if (projects[json.website.website].indexOf(member) == -1) {
                    projects[json.website.website].push(member);
                }
            }
        }
    }
}

var str = "";

for (var key in members) {
    if (members.hasOwnProperty(key)) {
        str += "members['" + key + "'] = " + members[key].length;
    }
    str += ";\n";
}

for (var key in projects) {
    if (projects.hasOwnProperty(key)) {
        str += "projects['" + key + "'] = " + projects[key].length;
    }
    str += ";\n";
}

var content = String(fs.readFileSync(process.cwd() + PATH_TO_INGOT));

var out = content.replace("{{insert}}", str);

fs.writeFile(process.cwd() + PATH_TO_JS, out, function (err) {
    if (err) {
        return console.log(err);
    }
});

function filterByTags(tags, member) {
    if (members["all"].indexOf(member) == -1)
        members["all"].push(member);

    if (tags) {
        for (var i = 0; i < tags.length; i++) {
            if (!members[tags[i]]) {
                members[tags[i]] = [];
            }

            if (members[tags[i]].indexOf(member) == -1) {
                members[tags[i]].push(member);
            }
        }
    }
}
