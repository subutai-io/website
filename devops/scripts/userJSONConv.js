//var profile = {};
//var userProfile = {};
var cn;
var uid;
var fs = require('fs');
fs.readFile('../../project-descriptors/generated/members/istus.json', function (err, data) {
    //if (err) return callback(err);
    //var result = doSomethingTo(data);
    //callback(null, result);
    infoJSON = JSON.parse(data);
    cn = infoJSON["ldap-user"].cn;

    uid = infoJSON["ldap-user"].uid;
    console.log(cn, uid)
});

var parser = require('xml2json');

var Activityxml;
var ActivityJSON;
var profilexml;
var profileJSON;
curl = require('node-curl');
curl('https://confluence.subutai.io/activity?maxResults=5&streams=user+IS+istus', function(err) {
    Activityxml = (this.body);
    ActivityJSON = parser.toJson(Activityxml);
    console.info(ActivityJSON);
    console.info('----------------------------------------------------------------');
    curl = require('node-curl');
    curl('https://jira.subutai.io/rest/api/2/user?key=istus', {USERNAME : "dashbot", PASSWORD : "ghkf346LU538QZRD", USERAGENT : "ssf"}, function(err) {
        profilexml = (this.body);
        profileJSON = parser.toJson(profilexml);
        console.info(profileJSON);
    });
})


//if (profileJSON.key){
//    profile.key = profileJSON.key;
//    profile.name = profileJSON.name;
//    profile.emailAddress = profileJSON.emailAddress;
//    profile.displayName = profileJSON.displayName;
//    var userActivity = [];
//    var feed = activityJSON.feed;
//    if ( feed.entry ){
//        for (var i = 0; i < feed.entry.length; i++)
//        {
//            var activity = {};
//            activity.published = feed.entry[i].published;
//            activity.updates = feed.entry[i].updated;
//            activity.category = feed.entry[i].category;
//            activity.summary = feed.entry[i]["activity:object"];
//            userActivity.push(activity);
//        }
//        profile.userActivity = userActivity;
//    }
//    else {
//        profile.userActivity = userActivity;
//    }
//    userProfile = {}
//    userProfile.userProfile = profile;
//    console.log( JSON.stringify(userProfile) );
//}
//else {
//    console.log( JSON.stringify(userProfile) );
//}