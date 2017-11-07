$(document).ready(function() {

    SyntaxHighlighter.defaults['toolbar'] = false;
    SyntaxHighlighter.all();


    $('.burger_menu').on('click', function(){
    	$('.phone_menu').slideToggle(500)
    });

});
