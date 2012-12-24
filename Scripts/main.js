function addToLunchbox(courseJSON){
	var list = $('#lunchbox-'+courseJSON.type);
	console.log(list.size());
	if ( courseJSON.type == 'entrees' || courseJSON.type == 'sides' ) {
		emptyItem = list.find('.lunchbox-emptyItem');
		console.log(emptyItem.size());
		if ( emptyItem.size() > 0 ) {
		
			$(emptyItem[0]).html( '<i class="icon-remove icon-brown" title="Remove" rel="tooltip"></i> ' + courseJSON.name).removeClass('lunchbox-emptyItem').addClass('lunchbox-filledItem');
			
			return true;
			
		} else {
			alert('no empty item');
			return false;
		}
	}
	if ( courseJSON.type == 'others' ) {
		list.append( '<li class="lunchbox-filledItem"><i class="icon-remove icon-brown" title="Remove" rel="tooltip"></i> ' + courseJSON.name + '</li>').removeClass('lunchbox-emptyItem').addClass('lunchbox-filledItem');
	}
	return false;
}
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
	}).on('click',function(e){
		var item = $(e.currentTarget);
		item.find('.lunchbox-select').trigger('click');

	});
	
	$('[rel="tooltip"]').tooltip();
	
	$('#lunchbox').on('click','.icon-remove', function(e) {
		var remove = $(e.target);
		var li = remove.parent();
		if (li.parent().attr('id') == 'lunchbox-others' ) {
			li.remove();
		} else {
			li.html('').removeClass('lunchbox-filledItem').addClass('lunchbox-emptyItem');	
		}
	});
	$('.course').on('click', function(e){
		$(e.currentTarget).toggleClass('selected');
		
		var type = $('.tab-pane.active').attr('data-type');
		
		if ($(e.currentTarget).hasClass('selected')) {
		var courseImg = $(e.currentTarget).find('img');
		var lunchbox = $('#lunchbox-'+type);
		
		var productX 		= courseImg.offset().left;
		var productY 		= courseImg.offset().top;
		
		
		var basketX 		= lunchbox.offset().left;
		var basketY 		= lunchbox.offset().top;
		
		
		var gotoX 			= basketX - productX;
		var gotoY 			= basketY - productY;
		
		var newImageWidth 	= courseImg.width() / 3;
		var newImageHeight	= courseImg.height() / 3;
		
		courseImg
		.clone()
		.prependTo($(e.currentTarget))
		.css({'position' : 'absolute','z-index':99,})
		.animate({opacity: 0.4}, 100 )
		.animate({opacity: 0.1, marginLeft: gotoX, marginTop: gotoY, width: newImageWidth, height: newImageHeight}, 1200, function() {
			
			$(this).remove();
		
		
			//success
			addToLunchbox({type:type,name:'Kung Pao Chicken'});
			
			$.ajax({  
				type: "POST",  
				url: "inc/functions.php",  
				data: { productID: 'nothing', action: "addToBasket"},  
				success: function(theResponse) {
										
				}  
			});  
		
		});
	}//end if

	});
	
	


});