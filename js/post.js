$(document).ready(function () {
    var projectResourcesItems = $(".sliderVertical > div").length;
    var screenWidth = $(window).width();
    $('[data-toggle="tooltip"]').tooltip();

    //$('[data-toggle="tooltip"]').tooltip();

    function sticky_relocate() {
        var window_top = $(window).scrollTop();
        var div_top = $('.stickyPoint').offset().top;
        if (window_top > div_top) {
            $('.stickyDiv').addClass('stick');
        } else {
            $('.stickyDiv').removeClass('stick');
        }
    }

    $(function () {
        $(window).scroll(sticky_relocate);
        sticky_relocate();
    });

    if (screenWidth < 1200) {
        $('#bannerSlider').css('margin-top', '0');
        if (projectResourcesItems == 1) {
            $('.sliderVertical').bxSlider({
                mode: 'horizontal',
                minSlides: 3,
                maxSlides: 4,
                slideWidth: 85,
                slideMargin: 35
            });
            $('#bannerSlider').css('margin-top', '0');
        }
        else {
            $('.sliderVertical').bxSlider({
                mode: 'horizontal',
                minSlides: 3,
                maxSlides: 4,
                slideWidth: 80,
                slideMargin: 35
            });
            $('#bannerSlider').css('margin-top', '0');
        }

    }
    else {
        $('.sliderVertical').bxSlider({
            mode: 'vertical',
            minSlides: 4,
            slideMargin: 10
        });

        $('.projectResourcesSubmenu').mouseenter(function () {
            $(this).toggleClass('visibleDiv');
        });

        $('.projectResourcesSubmenu').mouseleave(function () {
            $(this).toggleClass('visibleDiv');
        });

        //if (projectResourcesItems === 1) {
        //    $('.projectResourcesSubmenu').addClass('oneProjectResource');
        //}
        //if (projectResourcesItems === 2) {
        //    $('.projectResourcesSubmenu').addClass('twoProjectResources');
        //}

        $('.submenuHover').hover(function( e ) {
            var toggled = $(this).attr('toggle-hov');
            $('.' + toggled).toggleClass('visibleDiv');
            $('.' + toggled).css('top', Math.floor(( e.pageY - 335 ) / 10) * 10);
        });

        $('.subDesr').hover(
        function( e ) {
            $(this).closest('.projectResourcesSubmenu').find('.subitemDesc').text($(this).attr('text'));
        },
        function( e ) {
            console.log("wah");
            var text = $(this).closest('.projectResourcesSubmenu').find('.subitemDesc').attr('data-original-title');
            $(this).closest('.projectResourcesSubmenu').find('.subitemDesc').text( text );
        });
    }


    $("#bannerSlider").owlCarousel({
        items: 2,
        loop: true,
        margin: 10
    });
});
