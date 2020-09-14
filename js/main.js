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
	$('.validation__textarea').keyup(function() {
		validText();
	});
	$('#formBtnFooter').click(function() {
		if (validation()) {
	        sendForm()
	    }
	});

	function sendForm() {
		var firstname = $('#nameFooter').val();
		var email = $('#emailFooter').val();
		var descr = $('#descrFooter').val();

		var feedbackModal = $('#feedbackModal');
		var feedbackMessageSend = $('.feedback__message-send');
		var feedbackMessageNotSend = $('.feedback__message-notsend');

		var leadStatus = 'Interest';
		var contactType = 'Prospect';
		var source = 'Website';
		var leadGeneration = 'Inbound';

		var xhr = new XMLHttpRequest();
		var url = 'https://api.hsforms.com/submissions/v3/integration/submit/6484354/ba6957be-53f3-4cc6-877f-d0dc0d677081'
		// Example request JSON:
		var data = {
			"fields": [
				{
					"name": "firstname",
					"value": firstname
				},
				{
					"name": "email",
					"value": email
				},
				{
					"name": "description",
					"value": descr
				},
				{
					"name": "hs_lead_status",
					"value": leadStatus
				},
				{
					"name": "contact_type",
					"value": contactType
				},
				{
					"name": "source",
					"value": source
				},
				{
					"name": "lead_generation",
					"value": leadGeneration
				}
			]
		}
		var final_data = JSON.stringify(data)
		xhr.open('POST', url);
		// Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onreadystatechange = function() {
			$('#nameFooter').val('');
			$('#emailFooter').val('');
			$('#descrFooter').val('');
			$('.validation__text').removeClass('active');

			if(xhr.readyState == 4 && xhr.status == 200) { 
				$(feedbackMessageNotSend).hide();
				$(feedbackMessageSend).show();
				$(feedbackModal).show();
			} else if (xhr.readyState == 4 && xhr.status == 400){
				$(feedbackMessageSend).hide();
				$(feedbackMessageNotSend).show();
				$(feedbackModal).show();
				console.log(xhr.responseText);
			} else if (xhr.readyState == 4 && xhr.status == 403){ 
				$(feedbackMessageSend).hide();
				$(feedbackMessageNotSend).show();
				$(feedbackModal).show();
				console.log(xhr.responseText);        
			} else if (xhr.readyState == 4 && xhr.status == 404){ 
				$(feedbackMessageSend).hide();
				$(feedbackMessageNotSend).show();
				$(feedbackModal).show();
				console.log(xhr.responseText);
			}

			function hideModalAndMessages(){
				$(feedbackModal).hide();
				$(feedbackMessageNotSend).hide();
				$(feedbackMessageSend).hide();
			}
			setTimeout(hideModalAndMessages, 3000);
		} 
		// Sends the request	    
		xhr.send(final_data)	
	}
	$('.close, .modal__back').click(function() {
		$('#feedbackModal').hide();
		$('.feedback__message-send').hide();
		$('.feedback__message-notsend').hide();
	});
});