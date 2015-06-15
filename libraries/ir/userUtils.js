userUtils = (function($) {

	var detailsTemplatePath = "templates/partials/ir-form.html";
	var editUserTemplatePath = "templates/partials/editUser.html";	//  move to config

	var submitIncidentReportForm,
		openDetailsDialogWindow,
		openFullNarrativeWindow,
		editUserData,
		removeUserData,
		addNewUser,
		submitUserUpdate;

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

	openDetailsDialogWindow = function(reportID) {

		// Get instance of the renderDetails object
		// var reportDetailsLoader = window['reportDetails'];

		// Get report data from cache
		var report = irUtils.getCachedReport(reportID);
		if(report == null) {

			// TODO: Display message in message div on dialog form?
		}

		if(typeof reportDetails != "undefined") {

			viewUtils.openModalView(detailsTemplatePath, report, reportDetails);
		}
		else {

			console.log("openDetailsDialogWindow() error: loader object not found for template!");
		}
	};

	openFullNarrativeWindow = function(reportID) {

		var report = irUtils.getCachedReport(reportID);
		if(report == null) {

			// TODO: Display message in message div on dialog form?
		}

		var narrativeWindow = '<div id="full-narrative-view"><p>' + report.OffenseNarrative + '</p></div>';
		viewUtils.openModalView(narrativeWindow);
	};

	editUserData = function(userID) {

		// Get the user data from the corresponding table row userID
		var userData = [];
		userData['username'] = $('td#username-' + userID).text();
		userData['email'] = $('td#email-' + userID).text();
		userData['admin'] = $('td#admin-' + userID).text();
		userData['sendType'] = $('td#sendType-' + userID).text();
		userData['userID'] = userID;

		viewUtils.openModalView(editUserTemplatePath, userData, editUser);
	};

	submitUserUpdate = function() {

		// Get data from form
		var userID = $('form#edit-user-data').attr("data-internalid");	// Get stored userID from form
		var formData = $('#edit-user-data').serialize() + '&userid=' + userID;

		requestObj = {

			type: "PUT",
			url: service_url + _editUserData,
			dataType: "json", 
			data: formData,
			success: function (response) {

	 			if(response.status == "success") {

	 				// Send message
	 				systemUtils.sendMessage("User data updated successfully.");
	 				systemUtils.updateSessionToken(response.token);
				}
				else {

					console.log("submitUserUpdate: Server reports error when writing to the database");
					systemUtils.sendMessage("Server error: Please contact Systems support");
				}
			},
            error: function ( jqXHR, textStatus, errorThrown ) {

                console.log("submitUserUpdate Status: " + textStatus + " Message: " + errorThrown);
               	systemUtils.sendMessage("Server error: Please contact Systems support");
            }
		};

		systemUtils.doAjax(requestObj);
	};

	removeUserData = function(userID) {

		requestObj = {

			type: "POST",
			url: service_url + _removeUserData,
			dataType: "json", 
			data: {ID : userID},
			success: function (response) {

	 			alert("remove success: " + response);
	 			
			},
            error: function ( jqXHR, textStatus, errorThrown ) {

                console.log("removeUserData Status: " + textStatus + " Message: " + errorThrown);
               	systemUtils.sendMessage("Server error: Please contact Systems support");
            }
		};

		systemUtils.doAjax(requestObj);
	};

	addNewUser = function() {

		viewUtils.openModalView(editUserTemplatePath, null, addUser);
	};

	return {

		submitIncidentReportForm: function() {

			submitIncidentReportForm();
		},
		openDetailsDialogWindow: function(reportID) {	// viewutis

			openDetailsDialogWindow(reportID);
		},
		openFullNarrativeWindow: function(reportID) {	// to viewutils

			openFullNarrativeWindow(reportID);
		},
		editUserData: function(userID) {

			editUserData(userID);
		},
		removeUserData: function(userID) {

			removeUserData(userID);
		},
		addNewUser: function() {

			addNewUser();
		},
		submitUserUpdate: function() {

			submitUserUpdate();
		}
	};

}(jQuery))