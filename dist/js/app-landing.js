

var header = $('.headerBanner');
var range = 150;

$(window).on('scroll', function() {
	height = header.outerHeight(),
	offset = height / 2,
	calc = 1 - (scrollTop - offset + range) / range;

	header.css({ 'opacity': calc });

	if (calc > '1') {
		header.css({'opacity': 1 });
	} else if (calc < '0') {
		header.css({'opacity': 0 });
	}
});

// close button - door slam
function closeDoor() {
	document.getElementById("opacity-bg").style.display = "none";
}