$(document).ready(function(){
	$('.close, .modal__back').click(function() {
		$('.checkbox').prop("checked", false);
	  	$('#email').val("");
	  	$('#firstName').val("");
	  	$('#lastName').val("");
	  	$('#phone').val("");
	  	$('#descrEstimate').val("");
	  	$('.secondary__radio').prop("checked", false);
	});
	$('#project').click(function() {
		agree = $('.agree__project').text();
		$('.radio__check-project').addClass('checked');
		$('.radio__check-project').removeClass('invalid');
		$('.radio__check-communications').removeClass('checked');
		$('.radio__check-communications').removeClass('invalid');
		$('.validation__text-radio').removeClass('active');

	});
	$('#communications').click(function() {
		agree = $('.agree__communications').text();
		$('.radio__check-communications').addClass('checked');
		$('.radio__check-communications').removeClass('invalid');
		$('.radio__check-project').removeClass('checked');
		$('.radio__check-project').removeClass('invalid');
		$('.validation__text-radio').removeClass('active');
	});
	var device = '';
	$('.device').click(function(){
		device = [];
		$("input[name='device']:checked").each(function () {
			device.push($(this).val());
		});
	});
	var scope = '';
	$('.scope').click(function(){
		scope = [];
		$("input[name='scope']:checked").each(function () {
			scope.push($(this).val());
		});
	});

	function validation() {
		let valid = true;
		$('.validation').each(function() {
		  if(!$(this).val().length >= 1){
		  	$(this).addClass('invalid');
				valid = false;
		  }
		});
		$('.main__input').each(function() {
		  if(!$(this).val().length >= 1){
		  	$('.validation__text-inputs').addClass('active');
		  	validText();
				valid = false;
		  }
		});
		if( !validEmail($('.main__input-email').val())) {
			valid = false;
		}
		if( !validPhone($('.main__input-phone').val())) {
			valid = false;
		}
		if(!$('.secondary__form_text').val().length >= 1){
			$('.validation__text-description').addClass('active');
			valid = false;
		}
		
		if(!$('.radio__check-project').hasClass('checked') 
		&& !$('.radio__check-communications').hasClass('checked')) {
			$('.radio__check-project').addClass('invalid');
			$('.radio__check-communications').addClass('invalid');
			$('.validation__text-radio').addClass('active');
			valid = false;
		}
		return valid;
	}


	$('.focus').focus(function() {
		$(this).removeClass('invalid');
		validText();
	});

	$('.secondary__form_text').focus(function() {
		$('.validation__text-description').removeClass('active');
	});
	$('.secondary__form_text').focusout(function(){
		if(!$(this).val().length >= 1){
			$(this).addClass('invalid');
		}
	});

	function removeActiveValidText() {
		$($('.valid__text')).each(function() {
		  	$(this).removeClass('active');			  
		});
	}
	
	$('.main__input').focusout(function(){
		if(!$(this).val().length >= 1){
			$(this).addClass('invalid');
			$('.validation__text-inputs').addClass('active');
			removeActiveValidText();
			validText();
		} else {
			validText();
		}
	});

	$('.main__input').change(function() {
  		$(this).removeClass('invalid');
  		$('.validation__text-inputs').removeClass('active');
  		removeActiveValidText();
  		validText();
	});

	function validEmail(email) {
	  var regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regexEmail.test(email);
	}

	function validPhone(phone) {
	  var regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	  return regexPhone.test(phone);
	}

	function validText() {
		if ($('.main__input.invalid').length >= 2) {
			removeActiveValidText();
			$('.valid__text-all').addClass('active');
		} else {
			if ($('.main__input-name').hasClass('invalid')) {
				removeActiveValidText();
				$('.valid__text-name').addClass('active');
			}
			if ($('.main__input-sername').hasClass('invalid')) {
				removeActiveValidText();
				$('.valid__text-sername').addClass('active');
			}
			if ($('.main__input-email').val().length >= 1) {
				if( !validEmail($('.main__input-email').val())) {
					$('.main__input-email').addClass('invalid');
					$('.validation__text-inputs').addClass('active');
					removeActiveValidText();
					$('.valid__text-email_correct').addClass('active');
				}
			} else {
				if ($('.main__input-email').hasClass('invalid')) {
					removeActiveValidText();
					$('.valid__text-email').addClass('active');
				}
			}
			if ($('.main__input-phone').val().length >= 1) {
				if( !validPhone($('.main__input-phone').val())) {
					$('.main__input-phone').addClass('invalid');
					$('.validation__text-inputs').addClass('active');
					removeActiveValidText();
					$('.valid__text-phone_correct').addClass('active');
				}
			} else {
				if ($('.main__input-phone').hasClass('invalid')) {
					removeActiveValidText();
					$('.valid__text-phone').addClass('active');
				}
			}
		}
		if ($('.main__input.invalid').length == 0) {
			$('.validation__text-inputs').removeClass('active');
			removeActiveValidText();
		}
	}

	$('.secondary__form_text').focusout(function(){
		if(!$(this).val().length >= 1){
			$('.validation__text-description').addClass('active');
		}
	});


	
	$('#formBtnEstimate').click(function() {
		if (validation()) {
				sendForm()
	    }
	});

	function sendForm() {
		var modal = $('#regModal');
		var email = $('#email').val();
		var firstname = $('#firstName').val();
		var lastname = $('#lastName').val();
		var phone = $('#phone').val();
		var descr = $('#descrEstimate').val();
		var deviceStr = device.toString();
		var scopeStr = scope.toString();

		var leadStatus = 'Interest';
		var contactType = 'Prospect';
		var source = 'Website';
		var leadGeneration = 'Inbound';

		var xhr = new XMLHttpRequest();
    	var url = 'https://api.hsforms.com/submissions/v3/integration/submit/6484354/0faaa5e1-3afa-4aae-b4c0-e6b141f4a3d8'
    	// Example request JSON:
	    var data = {
	      "fields": [
	      	{
	          "name": "device_of_project",
	          "value": deviceStr
	        },
	        {
	          "name": "scope_of_project",
	          "value": scopeStr
	        },
	      	{
	          "name": "email",
	          "value": email
	        },
	        {
	          "name": "firstname",
	          "value": firstname
	        },
	        {
	          "name": "lastname",
	          "value": lastname
	        },
	        {
	          "name": "mobilephone",
	          "value": phone
	        },
	        {
	          "name": "description",
	          "value": descr
	        },
	        {
	          "name": "agreement",
	          "value": agree
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
	        if(xhr.readyState == 4 && xhr.status == 200) {
	        	$(modal).show();
	            $('.form__block').addClass('disable');
	       		$('.send__message').addClass('active');
	        } else if (xhr.readyState == 4 && xhr.status == 400){
	        	$(modal).show();
	        	$('.form__block').addClass('disable');
	        	$('.notsend__message').addClass('active');
	        	console.log(xhr.responseText);
	        } else if (xhr.readyState == 4 && xhr.status == 403){
	        	$(modal).show(); 
	            $('.form__block').addClass('disable');
	        	$('.notsend__message').addClass('active');
	        	console.log(xhr.responseText);        
	        } else if (xhr.readyState == 4 && xhr.status == 404){
	        	$(modal).show();
	            $('.form__block').addClass('disable');
	        	$('.notsend__message').addClass('active');
	        	console.log(xhr.responseText);
	        }
	       } 
	    // Sends the request	    
	    xhr.send(final_data);
	}
});