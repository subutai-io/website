$(document).ready(function(){
    'use strict'
    SyntaxHighlighter.defaults['toolbar'] = false;
    SyntaxHighlighter.all();
    
    var x  = $('#fcheck[type="checkbox"]');
	var win = $('#fcheckwin[type="checkbox"]');
	var lin = $('#fchecklin[type="checkbox"]');
	console.log(x);
	x.change(function(){
		var checked = $(this).prop('checked');
		if(checked){
			$('.for_dev').css('display', 'block')
		}else{
			$('.for_dev').css('display', 'none')
		}
	});
	win.change(function(){
		var checked = $(this).prop('checked');
		if(checked){
			$('.for_dev_win').css('display', 'block')
		}else{
			$('.for_dev_win').css('display', 'none')
		}
	});
	lin.change(function(){
		var checked = $(this).prop('checked');
		if(checked){
			$('.for_dev_lin').css('display', 'block')
		}else{
			$('.for_dev_lin').css('display', 'none')
		}
	});
})