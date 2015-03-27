userUtils = (function($) {

	var submitIncidentReportForm;

	submitIncidentReportForm = function() {

		// Get data from form
		var formData = $('#incident-report').serialize();

		requestObj = {

			type: "POST",
			url: service_url + _submitIRForm,
			dataType: "text", 
			data: formData,
			success: function (response) {

				if(response == "SUCCESS") {

					//sendMessage("Incident Report submitted.");

					// Clear form
					$('#incident-report').trigger("reset");
				}
				else {

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