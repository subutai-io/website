var members = {};
var category = getParameterByName("category");

{{insert}}

if (category == 'cloud') {
    $('#members_amount').text(members['cloud']);
}
else if (category == 'security') {
    $('#members_amount').text(members['security']);
}
else if (category == 'bigdata') {
    $('#members_amount').text(members['bigdata']);
}
else if (category == 'configuration') {
    $('#members_amount').text(members['configuration']);
}
else if (category == 'internet-of-things') {
    $('#members_amount').text(members['internet-of-things']);
}
else {
    $('#members_amount').text(members['all']);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}