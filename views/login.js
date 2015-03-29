loginView = (function($) {

	var doModal,
		render,
		submit,
		reset,
		exit;

	var frame = '#content',
		template = 'login';

	doModal = function() {

		//$('#content').find('*').attr('disabled', true);
		$('#content').empty();
		render();
	};

	render = function() {

		$.get('templates/login.html', function(data) {

			$(frame).append(data);
		});
	};

	submit = function() {


	};

	reset = function() {


	};

	close = function() {

		$('#content').find('*').attr('disabled', false);
	};

	return {

		doModal: function() {

			doModal();
		},
		submit: function() {

			doModal();
		},
		reset: function() {

			reset();
		},
		close: function() {

			close();
		}
	};


}(jQuery));

