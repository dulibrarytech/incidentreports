users = {

	element: '#users-table',

	init: function(tableData) {

		//this.bindEvents();
		this.construct(tableData);
	},

	bindEvents: function() {

		
	},

	construct: function(tableData) {

		var tableString = "";

		// Construct header
		tableString += '<thead>';
		tableString += '<tr></tr>';
		tableString += '</thead><tbody>';

		$.each(tableData, function(index, value) {

		}

		tableString += "</tbody>";
		$(this.element).append(tableString);
	}
};