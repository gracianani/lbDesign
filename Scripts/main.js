$(document).ready(function(){
	$('.carousel').carousel();
	$('.smlHoverdown').on('mouseenter', function(e){
		var link = $(e.currentTarget);
		link.addClass('open');
	}).on('mouseleave', function(e){
		var link = $(e.currentTarget);
		link.removeClass('open');
	});
});