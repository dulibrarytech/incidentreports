dashboard = {

	element: "#reports-table",
	template: "dashboard",

	init: function(tableData) {
		
		// namestring
		this.construct(tableData);
	},

	construct: function(tableData) {

		var tableString = "";

		// Header
		tableString += "<th width='5%'>Details</th><th width='6%'>FollowUp</th><th width='5%'>Tracking Number</th><th width='10%'>Date of Report</th><th width='10%'>Date of Offense</th><th width='10%'>Report Completed By</th><th width='10%'>Department</th><th width='10%'>Nature of Offense</th><th width='34%'>Offense Narrative</th>";

		$(this.element).append(tableString);
	}
};

