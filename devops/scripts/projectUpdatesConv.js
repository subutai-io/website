var updatesJSON = JSON.parse(process.argv[2])
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
    lastUpdate.lastUpdates = lastUpdates;
    console.log( JSON.stringify( lastUpdate ) );
}
else {
    lastUpdate.lastUpdates = [];
    console.log( JSON.stringify( lastUpdate ) );
}