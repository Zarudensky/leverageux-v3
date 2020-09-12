$(document).ready(function(){
	// animated section
	$(window).scroll(function() {
		var scrollWindow = $(window).scrollTop() + $(window).height();
		// animated section idea
		var sectionIdea = $('.idea__img_lamp').offset().top + $('.idea__img_lamp').height();
	 	if(scrollWindow > sectionIdea){
	        $('.section__idea').addClass('animated');
		}
		// animated section real
		var sectionReal = $('.section__real').offset().top - 100;
		if(scrollWindow > sectionReal){
	        $('.section__real').addClass('animated');
		}
		// animated section real
		var sectionCrypt = $('.section__crypt').offset().top - 100;
		if(scrollWindow > sectionCrypt){
	        $('.section__crypt').addClass('animated');
		}
		// animated section real
		var sectionMoney = $('.section__money').offset().top - 100;
		if(scrollWindow > sectionMoney){
	        $('.section__money').addClass('animated');
		}
    });

    // animated block to scroll
	$(window).scroll(function() {
		var block_show = null;
		var wt = $(window).scrollTop();
		var wh = $(window).height();

		// animated how
		var howTop = $('.how__svg').offset().top;
		var howHeight = $('.how__svg').outerHeight();
	    if (wt + wh >= howTop && wt + wh - howHeight * 2 <= howTop + (wh - howHeight)){
			if (block_show == null || block_show == false) {
				$('.section__how').addClass('animated');
			}
			block_show = true;
		}
    });
    // hover how round
    $('#r__purple').hover(function() {	
	    $('.how__title_purple').addClass('hover');
	    }, function(){
	    $('.how__title_purple').removeClass('hover');
	});
	$('#r__green').hover(function() {	
	    $('.how__title_green').addClass('hover');
	    }, function(){
	    $('.how__title_green').removeClass('hover');
	});
	$('#r__yellow').hover(function() {	
	    $('.how__title_yellow').addClass('hover');
	    }, function(){
	    $('.how__title_yellow').removeClass('hover');
	});
	$('#r__pink').hover(function() {	
	    $('.how__title_pink').addClass('hover');
	    }, function(){
	    $('.how__title_pink').removeClass('hover');
	});
	$('.how__block_first').hover(function() {
	    $('#r__purple').addClass('hover');
	    }, function(){
	    $('#r__purple').removeClass('hover');
	});
	$('.how__block_second').hover(function() {	
	    $('#r__green').addClass('hover');
	    }, function(){
	    $('#r__green').removeClass('hover');
	});
	$('.how__block_third').hover(function() {	
	    $('#r__yellow').addClass('hover');
	    }, function(){
	    $('#r__yellow').removeClass('hover');
	});
	$('.how__block_fourth').hover(function() {	
	    $('#r__pink').addClass('hover');
	    }, function(){
	    $('#r__pink').removeClass('hover');
	});

	$('.slick__desktop').slick({
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1
	});
	$('.slick__mobile').slick({
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1
	});

});