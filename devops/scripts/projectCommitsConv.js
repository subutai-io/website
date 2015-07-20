var commitsJSON = JSON.parse(process.argv[2])
var commits = [];
var commit = {};
if ( commitsJSON.values ){
    for (var j = 0; j < commitsJSON.values.length; j++){
        var cmt = {};
        cmt.id = commitsJSON.values[j].id;
        cmt.message = commitsJSON.values[j].message;
        cmt.author = commitsJSON.values[j].author.name;
        cmt.displayId = commitsJSON.values[j].displayId;
        cmt.url = "https://stash.subutai.io/projects/'$key'/repos/main/commits/"+cmt.id;
        commits.push(cmt);
    }
    commit.commits = commits;
    console.log( JSON.stringify( commit ) );
}
else {
    commit.commits = [];
    console.log( JSON.stringify( commit ) );
}