home.jsloginView = (function($) {

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
		$.get('templates/home.html', function(data) {
			$(element).append(data);
		});
	};

	return {

		render: function() {

			render();
		}
	};


}(jQuery));

