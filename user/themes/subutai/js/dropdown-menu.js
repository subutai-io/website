function myFunction() {
    var x = document.getElementById("mainMenu");
    if (x.className === "topNav") {
        x.className += " responsive";
    } else {
        x.className = "topNav";
    }
}
