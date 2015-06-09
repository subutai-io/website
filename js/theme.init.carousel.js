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