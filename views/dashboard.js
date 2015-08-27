dashboard = {

	element: "#reports-table",
	template: "dashboard",
	truncLength: 150,

	init: function() {

		this.bindEvents();
		this.addFormValidation();
	},

	render: function(tableData) {
		
		// namestring
		this.construct(tableData);
	},

	construct: function(tableData) {

		// Add search form
		$.get('templates/partials/ir-search-form.html', function(html) {
				
			$('#dashboard-links').append(html);
			$('#show-all-reports-link').hide();
			dashboardView.init(); // init once form is ready
		});

		this.buildTable(tableData);
	},

	bindEvents: function() {

		$( "#report-search-form" ).submit(function( event ) {
			
			if($("#report-search-form").valid()) {
				//userUtils.searchByOffenseType();
				alert("submitting");
			}
			else {
				event.preventDefault();
			}
		});
	},

	buildTable: function(tableData) {

		if(typeof tableData == 'object') {

			$(this.element).html("");

			var tableString = "";
			var detailsLink;
			var truncatedOffenseNarrative;

			// If there is a message, only display the message.  
			if(typeof tableData['MESSAGE'] == 'string') {

				tableString += "<h4>" + tableData['MESSAGE'] + "</h4>"; 
			}
			else {

				// Construct header
				tableString += '<thead>';
				tableString += '<tr><th width="6%">View Details</th><th width="2%">Tracking Number</th><th width="12%">Date of Report</th><th width="12%">Date of Offense</th><th width="12%">Report Completed By</th><th width="10%">Department</th><th width="12%">Nature of Offense</th><th width="34%">Offense Narrative</th></tr>';
				tableString += '</thead><tbody>';

				var maxLength = this.truncLength;
				$.each(tableData, function(index, value) {

					// Create a link to the details dialog popup
					detailsLink = '<a onclick="userUtils.openDetailsDialogWindow(' + value.ReportID + ')"><img src="assets/img/man-big-magnifying-glass.png" alt="Report details" width="22" height="22" /></a>'

					// Truncate offense narrative 
					// Add 'more' link to report narrative popup
					if(value.OffenseNarrative.length > maxLength) {

						truncatedOffenseNarrative = value.OffenseNarrative.substring(0,maxLength);
						truncatedOffenseNarrative += "  <a onclick='userUtils.openFullNarrativeWindow(" + value.ReportID + ")'>more...</a>";
					}
					else {

						// Show the entire narrative if it is shorter than maxLength
						truncatedOffenseNarrative = value.OffenseNarrative;
					}

					// Construct table row
					tableString += '<tr><td>' + detailsLink + '</td><td>' + value.ReportID + '</td><td>' + value.DateOfReport + '</td><td>' + value.DateOfOffense + '</td><td>' + value.ReportCompletedBy + '</td><td>' + value.Department + '</td><td>' + value.NatureOfOffense + '</td><td id="offense-narrative">' + truncatedOffenseNarrative + '</td></tr>';
				});
			}

			tableString += "</tbody>";
		}
		else {

			tableString = "Error!";
			console.log("Error: dashboard.buildTable(): bad table data argument");
		}
		$(this.element).append(tableString);
	},

	addFormValidation: function() {
		
		$("#report-search-form").validate({
		   rules: {
		     searchField: {
		     	length: 100
		     },
		     fromDate: {
		     	date: true
		     },
		     toDate: {
		     	date: true
		     }
		   }
		 });
	},

	close: function() {

	}
};

