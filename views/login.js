loginView = (function($) {

	var init,
		render,
		submit,
		reset,
		exit;

	var element = '#content',
		template = 'login';

	init = function() {


	};

	render = function() {

		$(element).empty();
		$.get('templates/login.html', function(data) {
			$(element).append(data);
		});
	};

	submit = function() {


	};

	reset = function() {


	};

	close = function() {

		$(element).find('*').attr('disabled', false);
		$(element).empty();
	};

	return {

		render: function() {

			render();
		},
		submit: function() {

			submit();
		},
		reset: function() {

			reset();
		},
		close: function() {

			close();
		}
	};


}(jQuery));

