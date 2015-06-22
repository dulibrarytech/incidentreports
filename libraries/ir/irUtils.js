irUtils = (function($) {

	// Functions
	var storeIncidentReports,
		getIncidentReports,
		loadDashboard,
		loadUsersView,
		getCachedReport,
		refreshReportsTable,
		clearReportsSearchForm;

	getCachedReport = function(reportID) {

		var report = null;
		var allReports = getIncidentReports();

		for(var i=0; i<allReports.length; i++) {

			if(allReports[i].ReportID == reportID) {

				report = allReports[i];
			}
		}

		if(report == null) {

			console.log("Error: Can not retrieve reportID " + reportID + " from local cache");
		}

		return report;
	}

	storeIncidentReports = function(reports) {

		var reportString = JSON.stringify(reports);
		sessionStorage.setItem("report_data", reportString);
	};

	getIncidentReports = function() {

		return JSON.parse(sessionStorage.getItem("report_data"));
	};

	loadDashboard = function() {

		// Request data from all reports in the database, for the dashboard display
		requestObj = {

			type: "GET",
			url: service_url + _getReportData,
			dataType: "json", 
			success: function (response) {

				// Cache the data and render the dashboard
				if(typeof response.status != 'undefined' && response.status == "success") { 		

					storeIncidentReports(response.data); // cache data
					viewUtils.renderTemplate('dashboard', response.data);
				}
				else {

					console.log("loadDashboard: Cannot retrieve report data");
					sendMessage("Server error: Please contact Systems support");
				}
			},
            error: function ( jqXHR, textStatus, errorThrown ) {

                console.log("loadDashboard Status: " + textStatus + " Message: " + errorThrown);
               	sendMessage("Server error: Please contact Systems support");
            }
		};

		systemUtils.doAjax(requestObj);
	};

	loadUsersView = function() {

		// Request data from all reports in the database, for the dashboard display
		requestObj = {

			type: "GET",
			url: service_url + _getUserData,
			dataType: "json", 
			success: function (response) {

				// Cache the data and render the dashboard
				if(typeof response.status != 'undefined' && response.status == "success") { 		

					// storeIncidentReports(response.data); // cache data
					viewUtils.renderTemplate('users', response.data);
					//alert(test[0].Email);
				}
				else {

					console.log("loadIncidentReports: Cannot retrieve report data");
					sendMessage("Server error: Please contact Systems support");
				}
			},
            error: function ( jqXHR, textStatus, errorThrown ) {

                console.log("loadIncidentReports Status: " + textStatus + " Message: " + errorThrown);
               	sendMessage("Server error: Please contact Systems support");
            }
		};

		systemUtils.doAjax(requestObj);
	};

	refreshReportsTable = function(data) {

		// If no data passed in, refresh from the cache.
		if(typeof data == 'undefined') {
			data = getIncidentReports();
			// TODO reset forms
		}
		dashboard.buildTable(data);
	};

	clearReportsSearchForm = function() {

		$('input#trackingNumber').val("");
	};

	return {

		getCachedReport: function(reportID) {

			return getCachedReport(reportID);
		},
		storeIncidentReports: function(reports) { // reports = object

			storeIncidentReports(reports);
		},
		getIncidentReports: function() {

			return getIncidentReports();
		},
		loadDashboard: function() {

			loadDashboard();
		},
		loadUsersView: function() {

			loadUsersView();
		},
		refreshReportsTable: function(data) {

			refreshReportsTable(data);
		},
		clearReportsSearchForm: function() {

			clearReportsSearchForm();
		}
	};
s
}(jQuery));