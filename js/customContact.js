// Add here all your JS customizations
$(document).ready(function(){
    $('#toggleFaq').bind('click', function(event) {
        $('#faqDiv').toggle('show');
    });
    //$('#form-id').motioncaptcha({
    //    action: '#fairly-unique-id'
    //});
    //$('#affiliateForm').motionCaptcha();
    $('#contactForm').motionCaptcha();
    $('#memberForm').motionCaptcha();
    //$('#sponsorshipForm').motionCaptcha();
    $('#askForm').motionCaptcha();
    //$('#contributeForm').motionCaptcha();
    $('#generalForm').motionCaptcha();

    // $("#stickySidebar").sticky({topSpacing:0});
    // $('#country').countrySelect();

    // $(".memberType").hover(function() {
    //     $(this).children(".memberOverlay").fadeIn();
    // }, function() {
    //     $(this).children(".memberOverlay").fadeOut();
    // });

    // $('#contributeUsForm').steps();
});