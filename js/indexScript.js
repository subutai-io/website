$(document).ready(function(){
    $(".COPpointer").click(function(e) {
        e.preventDefault();
        $('html,body').animate({scrollTop: $(".COP").offset().top},'slow');
    });

    $(".POIpointer").click(function(e) {
        e.preventDefault();
        $('html,body').animate({scrollTop: $(".POI").offset().top},'slow');
    });

    $(".TCRpointer").click(function(e) {
        e.preventDefault();
        $('html,body').animate({scrollTop: $(".TCR").offset().top},'slow');
    });
});

// Carousel
(function($) {

    'use strict';

    if ($.isFunction($.fn['themePluginCarousel'])) {

        $(function() {
            $('[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)').each(function() {
                var $this = $(this),
                    opts;

                var pluginOptions = $this.data('plugin-options');
                if (pluginOptions)
                    opts = pluginOptions;

                $this.themePluginCarousel(opts);
            });
        });

    }

}).apply(this, [jQuery]);