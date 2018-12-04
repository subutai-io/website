function openSystem(evt, systemName) {
    var i, tabcontent, tabLinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0 ; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("tabLinks");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }
    document.getElementById(systemName).style.display = "block";
    evt.currentTarget.className += " active";
}
// windows
function devControlWin() {
    devLinkC = document.getElementById("linksControl-win");
    if (devLinkC.style.display === "block") {
        devLinkC.style.display = "none";
    } else {
        devLinkC.style.display = "block";
    }
}
function devDaemonWin() {
    devLinkD = document.getElementById("linksDaemon-win");
    if (devLinkD.style.display === "block") {
        devLinkD.style.display = "none";
    } else {
        devLinkD.style.display = "block";
    }
}
// mac
function devControlMac() {
    devLinkC_Mac = document.getElementById("linksControl-mac");
    if (devLinkC_Mac.style.display === "block") {
        devLinkC_Mac.style.display = "none";
    } else {
        devLinkC_Mac.style.display = "block";
    }
}
function devDaemonMac() {
    devLinkD_mac = document.getElementById("linksDaemon-mac");
    if (devLinkD_mac.style.display === "block") {
        devLinkD_mac.style.display = "none";
    } else {
        devLinkD_mac.style.display = "block";
    }
}
// linux
function devControlLinux() {
    devLinkC_linux = document.getElementById("linksControl-linux");
    if (devLinkC_linux.style.display === "block") {
        devLinkC_linux.style.display = "none";
    } else {
        devLinkC_linux.style.display = "block";
    }
}
function devDaemonLinux() {
    devLinkD_linux = document.getElementById("linksDaemon-linux");
    if (devLinkD_linux.style.display === "block") {
        devLinkD_linux.style.display = "none";
    } else {
        devLinkD_linux.style.display = "block";
    }
}

