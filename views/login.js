login = {

	element: '#content',
	template: 'login',

	init: function() {


	},

	submit: function() {

		systemUtils.submitLoginForm();
	},

	reset: function() {


	},

	close: function() {

		$(element).find('*').attr('disabled', false);
		$(element).empty();
	}
};

