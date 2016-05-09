users = {

	element: '#users-table',

	init: function() {

		this.bindEvents();
		//this.construct(tableData);
	},

	render: function(tableData) {

		//this.bindEvents();
		this.construct(tableData);
	},

	bindEvents: function() {

		
	},

	construct: function(tableData) {

		var tableString = "";
		var isAdmin;
		var editLink;
		var duidString = "";

		// Add new user link

		// Construct header
		tableString += '<thead>';
		tableString += '<tr><th width="20%">DUID</th><th width="30%">Email</th><th width="10%">Admin</th><th width="10%">Send Type</th><th width="15%"></th><th width="15%"></th></tr>';
		tableString += '</thead><tbody>';

		$.each(tableData, function(index, value) {

			// Add human readable value
			isAdmin = value.isAdmin == '1' ? "Yes" : "No";

			// Don't display "null" values in table data
			duidString = (value.DUID == null || value.DUID == 0) ? "" : value.DUID;

			// Set crud links with current iteration userID
			editLink = '<a onclick="userUtils.editUserData(' + value.EmailID + ')">Edit</a>';
			removeLink = '<a onclick="userUtils.removeUserData(' + value.EmailID + ')">Remove</a>';

			tableString += '<tr><td id="username-' + value.EmailID + '">' + duidString + '</td><td id="email-' + value.EmailID + '">' + value.Email + '</td><td id="admin-' + value.EmailID + '">' + isAdmin + '</td><td id="sendType-' + value.EmailID + '">' + value.SendType + '</td><td>' + editLink + '</td><td>' + removeLink + '</td></tr>';
		});

		tableString += "</tbody>";
		$(this.element).append(tableString);
	},

	close: function() {

	}
};