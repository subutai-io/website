function myFunction() {
    var x = document.getElementById("mainMenu");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
