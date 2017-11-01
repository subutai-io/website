jQuery.noConflict()(function(){

	jQuery(".phone_bars-burger").on("click", function () {
		jQuery(".phone").slideToggle(500);
	});
	var $grid = $('.gallery-wrapper').masonry({
		columnWidth: '.grid-sizer',
		percentPosition: true,
		transitionDuration: 0,
	});

	$grid.imagesLoaded().progress( function() {
		$grid.masonry();
	});
	
});