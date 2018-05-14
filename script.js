$(document).ready(function(){ 
  $.get("nav.html", function(data) {
    $("#menu").html(data);
  });
}); 