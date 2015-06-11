// Add here all your JS customizations
$(document).ready(function(){
    $('#toggleFaq').bind('click', function(event) {
        $('#faqDiv').toggle('show');
    });
    $('#contactForm').motionCaptcha();
    $('#memberForm').motionCaptcha();
    $('#askForm').motionCaptcha();
    $('#generalForm').motionCaptcha();

});