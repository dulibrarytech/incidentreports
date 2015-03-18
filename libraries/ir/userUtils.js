userUtils = (function($) {

	submitIncidentReportForm = function() {

		// Get data from form
		// serialize all 4 forms and concat ?

		requestObj = {

			type: "POST",
			url: base_url + _submitIRForm,
			dataType: "json", // json
			data: postData,
			success: function (response) {

				if(response != "invalid") {

					// Store updated token, load dashboard view
					
					//sendMessage("Incident Report submitted.");
				}
				else {

				}
			},
            error: function ( jqXHR, textStatus, errorThrown ) {

                console.log("submitIncidentReportForm Status: " + textStatus + " Message: " + errorThrown);
               	sendMessage("Server error: Please contact Systems support");
            }
		};

		doAjax(requestObj);

		// Clear form

	};

	return {

		submitIncidentReportForm: function() {

			alert("SIRF");
		}
	};

}(jQuery));