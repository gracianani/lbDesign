var selectCourse = function(courseJSON){
	var list = $('#lunchbox-'+courseJSON.type);
	var course = $('.course[data-id="'+courseJSON.id + '"]');
	if ( courseJSON.type == 'others' ) {
		list.append( '<li class="lunchbox-filledItem" data-id="'+courseJSON.id+'"><i class="icon-remove icon-brown" title="Remove" rel="tooltip"></i> <img src="' + courseJSON.img + '" />' + courseJSON.name  + '<span class="lunchbox-filledNum">X <input type="text" value="'+ '1' + '" class="input-mini"/></span> = <span class="lunchbox-filledPrice">'+courseJSON.price+'</span>'+ '</li>').removeClass('lunchbox-emptyItem').addClass('lunchbox-filledItem');
	} else {
		$(emptyItem[0]).html( '<i class="icon-remove icon-brown" title="Remove" rel="tooltip"></i> <img src="' + courseJSON.img + '" />' + courseJSON.name).removeClass('lunchbox-emptyItem').addClass('lunchbox-filledItem').attr('data-id',courseJSON.id);

	}
}

var unselectCourse = function(courseJSON) {
	var course = $('.course[data-id="'+courseJSON.id + '"]');
	var li = $('.lunchbox-filledItem[data-id="'+courseJSON.id+'"]');
	if (courseJSON.type == 'others') {
		li.remove();
	} else {
		li.html('').removeClass('lunchbox-filledItem').addClass('lunchbox-emptyItem');
	}
	course.removeClass('selected');
}

function flyto(src, dest, callback, arg) {

			
			var productX 		= src.offset().left;
			var productY 		= src.offset().top;
			var basketX 		= dest.offset().left;
			var basketY 		= dest.offset().top;
			var gotoX 			= basketX - productX;
			var gotoY 			= basketY - productY;
			var newImageWidth 	= src.width() / 3;
			var newImageHeight	= src.height() / 3;
			
			src
			.clone()
			.prependTo(src.parent())
			.css({'position' : 'absolute','z-index':99,})
			.animate({opacity: 0.4}, 100 )
			.animate({opacity: 0.1, marginLeft: gotoX, marginTop: gotoY, width: newImageWidth, height: newImageHeight}, 1200, function() {
				
				$(this).remove();
				//success
				callback.call(this,arg);
				$.ajax({  
					type: "POST",  
					url: "inc/functions.php",  
					data: { productID: 'nothing', action: "addToBasket"},  
					success: function(theResponse) {
											
					}  
				});  
			
			});	
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
		var id = li.attr('data-id');
		$('.course[data-id="' + id + '"]').removeClass('selected');
	});
	$('.course').on('click', function(e){
		var course = $(e.currentTarget);
		course.toggleClass('selected');
		
		var type = $('.tab-pane.active').attr('data-type');
		var id = course.attr('data-id');
		var name = course.find('p:first').html();
		
		if (course.hasClass('selected')) {
		
			if ( type == 'entrees' || type == 'sides' ) {
				emptyItem = $('#lunchbox-'+type + ' .lunchbox-emptyItem');
				if ( emptyItem.size() < 1 ) {
					alert('no empty box');
					course.toggleClass('selected');
					return;
				}
			}
			
			var courseImg = course.find('img');
			var lunchbox = $('#lunchbox-'+type);
			
			
			flyto(courseImg, lunchbox, selectCourse, {type:type, name:name, id:id, img:courseImg.attr('src'), price:'$7.00'});

		}//end if
		else {
			unselectCourse({type:type,id:id});
		}

	});
	
	


});