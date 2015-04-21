userUtils = (function($) {

	var submitIncidentReportForm,
		retrieveAllIncidentReports;

	submitIncidentReportForm = function() {

		// Get data from form
		var formData = $('#incident-report').serialize();

		requestObj = {

			type: "POST",
			url: service_url + _submitIRForm,
			dataType: "json", 
			data: formData,
			success: function (response) {

	 			if(response.status == "success") {

					if(response.emailStatus == "success") {

						 systemUtils.sendMessage("Incident Report submitted.");
					}
					else {

						systemUtils.sendMessage("Incident Report submitted, error sending email notifications");
						console.log("submitIncidentReportForm: Server reports email error, email notifications not sent");
					}

					// Store updated token from response

					// Clear form
					$('#incident-report').trigger("reset");
				}
				else {

					console.log("submitIncidentReportForm: Server reports error when writing to the database");
					systemUtils.sendMessage("Server error: Please contact Systems support");
				}
			},
            error: function ( jqXHR, textStatus, errorThrown ) {

                console.log("submitIncidentReportForm Status: " + textStatus + " Message: " + errorThrown);
               	systemUtils.sendMessage("Server error: Please contact Systems support");
            }
		};

		systemUtils.doAjax(requestObj);
	};

	return {

		submitIncidentReportForm: function() {

			submitIncidentReportForm();
		}
	};

}(jQuery))