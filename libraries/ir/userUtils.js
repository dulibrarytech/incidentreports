userUtils = (function($) {

	var submitIncidentReportForm;

	submitIncidentReportForm = function() {

		// Get data from form
		// serialize all 4 forms and concat ?
		var postData = [];

		requestObj = {

			type: "POST",
			url: service_url + _submitIRForm,
			dataType: "text", // json
			data: postData,
			success: function (response) {

				alert(response);
				if(response != "invalid") {

					//sendMessage("Incident Report submitted.");
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

		// Clear form

	};

	return {

		submitIncidentReportForm: function() {

			submitIncidentReportForm();
		}
	};

}(jQuery));