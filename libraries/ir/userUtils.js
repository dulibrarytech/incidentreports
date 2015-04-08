userUtils = (function($) {

	var submitIncidentReportForm,
		retrieveAllIncidentReports;

	submitIncidentReportForm = function() {

		// Get data from form
		var formData = $('#incident-report').serialize();

		requestObj = {

			type: "POST",
			url: service_url + _submitIRForm,
			dataType: "text", 
			data: formData,
			success: function (response) {

				if(response == "success") {

					systemUtils.sendMessage("Incident Report submitted.");

					// Clear form
					$('#incident-report').trigger("reset");
				}
				else {

					console.log("submitIncidentReportForm: Server reports error when writing to the database");
					systemUtils.sendMessage("Database error: Please contact Systems support");
				}
			},
            error: function ( jqXHR, textStatus, errorThrown ) {

                console.log("submitIncidentReportForm Status: " + textStatus + " Message: " + errorThrown);
               	systemUtils.sendMessage("Server error: Please contact Systems support");
            }
		};

		systemUtils.doAjax(requestObj);
	};

	loadIncidentReports = function() {

		requestObj = {

			type: "GET",
			url: service_url + _getReportData,
			dataType: "json", 
			success: function (response) {

				alert(response.data);

				// if(response.status == "success") { 		// check 'typeof status' ?

				// 	systemUtils.storeIncidentReports(JSON.stringify(response.data));
				// }
				// else {

				// 	console.log("loadIncidentReports: Cannot retrieve report data");
				// 	systemUtils.sendMessage("Server error: Please contact Systems support");
				// }
			},
            error: function ( jqXHR, textStatus, errorThrown ) {

                console.log("loadIncidentReports Status: " + textStatus + " Message: " + errorThrown);
               	systemUtils.sendMessage("Server error: Please contact Systems support");
            }
		};

		systemUtils.doAjax(requestObj);
	};

	getIncidentReports = function() {

		return sessionStorage.getItem("report_data");
	};

	return {

		submitIncidentReportForm: function() {

			submitIncidentReportForm();
		},
		loadIncidentReports: function() {

			loadIncidentReports();
		},
		getIncidentReports: function() {

			getIncidentReports();
		}
	};

}(jQuery))