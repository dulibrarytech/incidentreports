home = {

	element: "#content",
	template: "home",

	init: function() {

		// Get ir form html, append to #homepage-form div
		$.get('templates/partials/ir-form.html', function(html) {
				
			$('#homepage-form').append(html);
		});
	}
};

