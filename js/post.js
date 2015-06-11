$(document).ready(function () {

    initMedia();

    $( window ).resize(function() {
        initMedia();
    });

        $('.sliderVertical').bxSlider({
            mode: 'vertical',
            minSlides: 4,
            slideMargin: 10
        });

    $('.submenuHover').click(function( e ) {
        $('.projectResourcesSubmenu').removeClass('visibleDiv');

        $(this).tooltip('hide');

        var toggled = $(this).attr('toggle-hov');

        $('.' + toggled).find('ul').css('min-width', $('.' + toggled).find('ul').children().length * 53);

        $('.' + toggled).toggleClass('visibleDiv');

        var diff = $(this)[0].getBoundingClientRect().top - $(this).parent()[0].getBoundingClientRect().top;

        if( diff > 420 ) {
            diff -= 240;
        }

        var heightConst = 160;
        var elementsInRow = $('.projectResourcesMenu .submenuHover:not(.bx-clone)').length;
        if( elementsInRow == 3 ) heightConst = 90;
        if( elementsInRow == 2 ) heightConst = 30;
        if( elementsInRow == 1 ) heightConst = -28;

        $('.' + toggled).css('top', ( diff - heightConst) );
    });

    $('.projectResourcesSubmenu').hover(function () {
        $(this).addClass('visibleDiv');
    });
    $('.projectResourcesSubmenu').mouseleave(function () {
        $(this).removeClass('visibleDiv');
    });

    $(window).scroll(function() {
        var y = $('.projectContainer')[0].getBoundingClientRect().top;
        if( y < 30 ) y = 30;
        $('.rightSidebar').css('top', y );
        $('.projectResourcesMenu').css('top', y );
    } );


    $('[data-toggle="tooltip"]').tooltip({container: 'body'});
});

function initMedia() {
    var screenWidth = $(window).width();

    if(screenWidth <= 768) {
        $("#bannerSlider").owlCarousel({
            items: 1,
            loop: true,
            slideSpeed: 200,
            autoPlay: 3000,
            touchDrag: true
        });
    }
    else {
        $("#bannerSlider").owlCarousel({
            items: 2,
            loop: true,
            margin: 10,
            slideSpeed: 200,
            autoPlay: 3000,
            touchDrag: true
        });
    }
}


(function($){
    $(window).load(function(){
        var screenHeight = $(window).height();
        if(screenHeight <= 700) {

            $('.projectsDevelopers').mCustomScrollbar({
                axis:"y",
                theme:"minimal-dark"
            });

        }
    });
})(jQuery);