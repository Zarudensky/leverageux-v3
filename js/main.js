$(document).ready(function(){
	$(window).scroll(function(){
		var wt = $(window).scrollTop();
		var wh = $(window).height();
		var footerCalendarTop = $('#calendar_fr').offset().top;
		var footerLogo = $('.footer__logo').offset().top + $('.footer__logo').height();
		// fixed/no fixed heder
		if($('#btn_mn').length) {
			var headerBtnTop = $('#btn_mn').offset().top;
			var headerBtnHeight = $('#btn_mn').outerHeight();
			if (wt >= headerBtnTop + headerBtnHeight) {
				$('.header').addClass('scrolled');
				if (wt + wh >= footerCalendarTop) {
					$('.header').removeClass('scrolled');
				} else {
					$('.header').addClass('scrolled');
				}
			} else {
				$('.header').removeClass('scrolled');
			}
		} else { 
			if (wt >= 15.5) {
				$('.header').addClass('scrolled');
				if (wt + wh >= footerCalendarTop) {
					$('.header').removeClass('scrolled');
				} else {
					$('.header').addClass('scrolled');
				}
			} else {
				$('.header').removeClass('scrolled');
			}	
		}

		// animated heder when scrolled top
		if(!wt){
	        $('.header').addClass('animated');
		}else{
			$('.header').removeClass('animated');
	    }
		// $('.header__logo').addClass('animated');
		// $('.header__logo').removeClass('animated');

		// animated footer
	    if(wt + wh >= footerLogo){
	        $('.footer__block_logo').addClass('animated');
		}else{
			$('.footer__block_logo').removeClass('animated');
	    }
	});

	// scroll up
	$(window).scroll(function(){
	if ($(this).scrollTop() > 100) {
		$('.scrollup').fadeIn();
		} 
		else {
		$('.scrollup').fadeOut();
		}
	});
	$('.scrollup').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 600);
		return false;
	});

	// mobile menu
	$('#btn_om').click(function() {
		$('.header__block_menu').addClass('active');
		$('.menu__back').addClass('active');
		$('.btn__back').addClass('active');
		$('.header__block_menu').removeClass('closed');
	});
	$('.menu__btn_back, .header__block_menu, .menu__back').click(function() {
		if ($(window).width() < 1220) {
			$('.header__block_menu').removeClass('active');
			$('.menu__back').removeClass('active');
			$('.btn__back').removeClass('active');
			$('.header__block_menu').addClass('closed');
			setTimeout("$('.header__block_menu').removeClass('closed')", 400);
		}
	});

	// send form footer and validation
	function validation() {
		let valid = true;
		$('.validation__footer-form').each(function() {
		  if(!$(this).val().length >= 1){
				$(this).addClass('invalid');
				validText();
				valid = false;
			}
		});
		if( !validEmail($('.validation__footer-email').val())) {
			$('.validation__footer-email').addClass('invalid');
			$('.validation__text-footer').addClass('active');
			valid = false;
		}
		return valid;
	}
	function validEmail(email) {
	  var regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regexEmail.test(email);
	}
	function validText() {
		$('.validation__footer-form').each(function() {
		  if(!$(this).val().length >= 1){
		  	$('.validation__text-footer').addClass('active');
		  } else {
				$('.validation__text-footer').removeClass('active');
			}
		});
	}
	$('.validation__footer-form').focus(function() {
		$(this).removeClass('invalid');
	});
	$('.validation__footer-form').focusout(function(){
		if(!$(this).val().length >= 1){
			$(this).addClass('invalid');
		}
	});
	$('.validation__textarea').keyup(function() {
		validText();
	});
	$('#formBtnFooter').click(function() {
		if (validation()) {
	        sendForm()
	    }
	});

	function sendForm() {
		let firstname = $('#nameFooter').val();
		let email = $('#emailFooter').val();
		let descr = $('#descrFooter').val();
		let feedbackModal = $('#feedbackModal');
		let feedbackMessageSend = $('.feedback__message-send');
		let feedbackMessageNotSend = $('.feedback__message-notsend');

		console.log('send form');
		console.log(firstname);
		console.log(email);
		console.log(descr);
		
		$('#nameFooter').val('');
		$('#emailFooter').val('');
		$('#descrFooter').val('');
		$('.validation__text').removeClass('active');
		console.log('clear form');

		$(feedbackMessageSend).show();
		$(feedbackMessageNotSend).hide();
		$(feedbackModal).show();

		function hideModalAndMessages(){
			$(feedbackModal).hide();
			$(feedbackMessageNotSend).hide();
			$(feedbackMessageSend).hide();
			console.log('hide Modal And Messages');
		}
		setTimeout(hideModalAndMessages, 3000);
	}
	$('.close, .modal__back').click(function() {
		$('#feedbackModal').hide();
		$('.feedback__message-send').hide();
		$('.feedback__message-notsend').hide();
	});
});