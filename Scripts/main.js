$(document).ready(function(){
	$('.carousel').carousel();
	$('.smlHoverdown').on('mouseenter', function(e){
		var link = $(e.currentTarget);
		link.addClass('open');
	}).on('mouseleave', function(e){
		var link = $(e.currentTarget);
		link.removeClass('open');
	});
	$('.lunchboxItem').on('mouseenter', function(e){
		var item = $(e.currentTarget);
		item.find('.lunchbox-select').addClass('btn');
	}).on('mouseleave', function(e){
		var item = $(e.currentTarget);
		item.find('.lunchbox-select').removeClass('btn');
	}).onc('click',function(e){
		var item = $(e.currentTarget);
		item.find('.lunchbox-select').trigger('click');

	});

});