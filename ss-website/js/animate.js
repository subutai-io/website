jQuery(document).ready(function () {
    jQuery(window).scroll(function() {
        jQuery('.ss-main-info-text').each(function(){
            var imagePos = jQuery(this).offset().top;
            var topOfWindow = jQuery(window).scrollTop();
            if (imagePos < topOfWindow+1100) {
                jQuery(this).addClass('zoomIn');
            }
        });
    });
    jQuery(window).scroll(function() {
        jQuery('.possibilities-main__inner').each(function(){
            var imagePos = jQuery(this).offset().top;
            var topOfWindow = jQuery(window).scrollTop();
            if (imagePos < topOfWindow+1100) {
                jQuery(this).addClass('fadeInDown');
            }
        });
    });
    jQuery(window).scroll(function() {
        jQuery('.getting-started-main__info').each(function(){
            var imagePos = jQuery(this).offset().top;
            var topOfWindow = jQuery(window).scrollTop();
            if (imagePos < topOfWindow+690) {
                jQuery(this).addClass('bounceIn');
            }
        });
    });
});