/**
 * Created by akubatbekk on 6/7/15.
 */
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
