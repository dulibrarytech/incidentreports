dashboard = {

	element: "#reports-table",
	template: "dashboard",
	truncLength: 150,

	init: function(tableData) {
		
		// namestring
		this.construct(tableData);
	},

	construct: function(tableData) {

		var tableString = "<tbody>";
		var truncatedOffenseNarrative;

		// Header
		tableString += '<tr><th width="5%">Details</th><th width="6%">FollowUp</th><th width="5%">Tracking Number</th><th width="10%">Date of Report</th><th width="10%">Date of Offense</th><th width="10%">Report Completed By</th><th width="10%">Department</th><th width="10%">Nature of Offense</th><th width="34%">Offense Narrative</th></tr>';

		var maxLength = this.truncLength;
		$.each(tableData, function(index, value) {

			// Truncate offense narrative and add 'more' link
			if(value.OffenseNarrative.length > maxLength) {

				truncatedOffenseNarrative = value.OffenseNarrative.substring(0,maxLength);
				truncatedOffenseNarrative += "  <a href='userUtils.getFullNarrativeView(" + value.ReportID + ")'>more...</a>";
			}
			else {

				truncatedOffenseNarrative = value.OffenseNarrative;
			}

			tableString += '<tr><td></td><td></td><td>' + value.ReportID + '</td><td>' + value.DateOfReport + '</td><td>' + value.DateOfOffense + '</td><td>' + value.ReportCompletedBy + '</td><td>' + value.Department + '</td><td>' + value.NatureOfOffense + '</td><td id="offense-narrative">' + truncatedOffenseNarrative + '</td></tr>';
		});


		tableString += "</tbody>";

		$(this.element).append(tableString);
	}
};

