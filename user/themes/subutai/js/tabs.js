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