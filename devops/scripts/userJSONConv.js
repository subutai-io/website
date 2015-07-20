var profile = {};
var userProfile = {};

var profileJSON = JSON.parse(process.argv[2])
var activityJSON = JSON.parse(process.argv[3])

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

    userProfile.userProfile = profile;
    console.log( JSON.stringify(userProfile) );
}
else {
    console.log( JSON.stringify(userProfile) );
}