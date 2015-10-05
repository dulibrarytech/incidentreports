login = {

	element: '#content',

	render: function() {

		this.bindEvents();
	},

	bindEvents: function() {

		$('#login-submit').click(function(event) {
            event.preventDefault();
            if(loginView.validate( $('#login-uname').val(), $('#login-passwd').val() )) {
            	systemUtils.submitLoginForm();
            }
        });

        $('#login-cancel').click(function(event) {
        	loginView.close();
        	window.location.assign(base_url);
        });

        // Trigger submit with 'enter' keypress
		$('#login-form').bind('keypress', function(e){

		   if ( e.keyCode == 13 ) {
		     	e.preventDefault();
		     	$( "#login-submit" ).click();
		   }
		});
	},

	validate: function(uname, passwd) {

		var isValid = true;

		if($('#login-uname').val().length > 20) {
			$('#login-uname').val("Please enter 20 characters or less");
			isValid = false;
		}
		if($('#login-passwd').val().length > 30) {
			$('#login-passwd').val("Please enter 30 characters or less");
			isValid = false;
		}

		return isValid;
	},

	reset: function() {

		// Clear form
		$('#login-uname').val("");
		$('#login-passwd').val("");
	},

	close: function() {

		//$(element).find('*').attr('disabled', false);
		$('#login-dialog').remove();
	}
};

