function sendData() {
    var path = "http://subutai.io:8080";
    var params = "referrer=" + document.referrer +
                "&agent=" + navigator.userAgent +
                "&w=" + screen.width +
                "&h=" + screen.height;

    var e11fg;

    if ( window.XDomainRequest ) {
        var xdr = new XDomainRequest();
        xdr.open( "POST", path );
        xdr.withCredentials = true;
        xdr.onload = function () {
            e11fg = parseInt(xdr.responseText);
        };
        xdr.send(params);
    }
    else if ( window.XMLHttpRequest ) {
        var xhr = new XMLHttpRequest();

        xhr.open("POST", path, true);
        xhr.withCredentials = true;
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                e11fg = parseInt(xhr.responseText);
            }
        };
        xhr.send(params);
    }
}

sendData();