Modernizr.load([
	{
		test: Modernizr.placeholder,
		nope: 'js/placeholders.min.js'
	},
	{
		test: Modernizr.touch,
		yep: ['js/fastclick.min.js'],
		complete: function(){
			if (Modernizr.touch) {
				FastClick.attach(document.body);
			}
		}
	},
	{
		test: Modernizr.svg,
		nope: 'js/svg4everybody.legacy.js',
		complete: function() {
			// Svg falback, replace all .svg to .png in <img src="" />
			if (!Modernizr.svg) {
				var imgs = document.getElementsByTagName('img');
				var svgExtension = /.*\.svg$/
				var l = imgs.length;
				for (var i = 0; i < l; i++) {
					if (imgs[i].src.match(svgExtension)) {
						imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
						console.log(imgs[i].src);
					}
				}
			}
		}
	}
]);


$(document).ready(function() {
	$('select, input').styler();

	$('.content-wrapper table').basictable({baseClass: 'table'});

	// Here insert modules scripts
	//= require ../../../tmp/modules.js

	if($('.js-blockScroll').length > 0 && $(window).width() > 1160) {
		var blockScroller = $('.js-blockScroll').blockScroll();
	}

	$('.js-show-menu').on('click', function() {
		if($('.js-top-menu').hasClass('js-top-menu_opened')) {
			$('.js-top-menu').animate({'right': '-260px'}, 300);
			$('.js-top-menu').removeClass('js-top-menu_opened');
		} else {
			$('.js-top-menu').animate({'right': 0}, 300);
			$('.js-top-menu').addClass('js-top-menu_opened');
		}
	});

	$('.page-docs').bind('swiperight', swipeOpenMenu);
	$('.page-docs').bind('swipeleft', swipeCloseMenu);

	function swipeOpenMenu( event ){
		$('.sidebar').stop().animate({'left': '-35px'}, 300);
	}

	function swipeCloseMenu( event ){
		$('.sidebar').stop().animate({'left': '-300px'}, 300);
	}

});

