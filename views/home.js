home = {

	element: "#content",
	template: "home",

	init: function() {

		this.bindEvents();
	},

	render: function() {

		// Get ir form html, append to #homepage-form div
		$.get('templates/partials/ir-form.html', function(html) {
				
			$('#homepage-form').append(html);
			homeView.init();
		});
	},

	bindEvents: function() {

		$("#incident-report").submit(function(event) {

			alert("S");
		});
	}
};

