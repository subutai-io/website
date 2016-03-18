$('.js-to-top-arrow').click(function(){
	event.preventDefault();
	window.scrollTo(0, 0);
	window.location.hash = '';
});
