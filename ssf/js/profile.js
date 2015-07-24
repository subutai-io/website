/**
 * Created by akubatbekk on 7/24/15.
 */
$(document).ready(function() {
    $(window).scroll(function() {
        var y = $('.memberContainer')[0].getBoundingClientRect().top;
        if( y < 30 ) y = 30;
        $('.rightSidebar').css('top', y );
    } );
});