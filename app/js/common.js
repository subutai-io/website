jQuery(document).ready(function() {
    jQuery(".phone_bars-burger").click(function() {
        jQuery(".phone").fadeToggle(500)
    });
    jQuery(".exit_btnp").click(function(){
        jQuery(".phone").fadeToggle(500)
    });
    jQuery(window).resize(function() {
        if (jQuery(window).width() >= 1065) {
            jQuery(".phone").css("display", "none")
        }
    })
});