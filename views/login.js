login = {

	element: '#content',

	init: function() {

		this.bindEvents();
	},

	bindEvents: function() {

		$('#login-submit').click(function(event) {
            event.preventDefault();
            systemUtils.submitLoginForm();
        });
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

