userUtils = (function($) {

	var detailsTemplatePath = "templates/partials/ir-form.html";
	var editUserTemplatePath = "templates/partials/editUser.html";	//  move to config

	var submitIncidentReportForm,
		editIncidentReport,
		openDetailsDialogWindow,
		openFullNarrativeWindow,
		editUserData,
		removeUserData,
		addNewUser,
		submitUserUpdate,
		submitNewUserInfo,
		searchByTrackingNumber,
		resetReportsSearch,
		searchByOffenseType;

	 submitIncidentReportForm = function() {

		// Get data from form
		var formData = $('#incident-report').serialize();
		
		// Get client email setting, piggyback the data on the form data
		// if(sendEmailNotifications) {

		// 	formData += "&sendNotifications=true";
		// }

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
					else if(response.emailStatus == "disabled") {

						systemUtils.sendMessage("Incident Report submitted.");
						console.log("Email notifications are disabled");
					}
					else if(response.emailStatus == "error") { 

						systemUtils.sendMessage("Incident Report submitted, error sending email notifications");
						console.log("Server reports email error, email notifications not sent");
					}

					// Clear form
					$('#incident-report').trigger("reset");
				}
				else {

					console.log("Server reports error when writing to the database");
					systemUtils.sendMessage("Server error: Please contact Systems support");
				}
			},
            error: function ( jqXHR, textStatus, errorThrown ) {

                console.log("Status: " + textStatus + " Message: " + errorThrown);
               	systemUtils.sendMessage("Server error: Please contact Systems support");
            }
		};

		systemUtils.doAjax(requestObj);
	};

	editIncidentReport = function() {

		if(systemUtils.validateLocalSession()) {

			//Get data from form
			var formData = $('#incident-report').serialize();
			var id = irUtils.getCurrentReportID();

			requestObj = {

				type: "POST",
				url: service_url + _editIR,
				dataType: "json", 
				data: formData + "&reportID=" + id,
				success: function (response) {

		 			if(response.status == "success") {

						systemUtils.sendMessage("Incident Report updated.");
						systemUtils.updateSessionToken(response.token);
						irUtils.loadDashboard();
					}
					else {

						console.log("Server reports error when writing to the database");
						systemUtils.sendMessage("Server error: Please contact Systems support");
					}
				},
	            error: function ( jqXHR, textStatus, errorThrown ) {

	                console.log("Status: " + textStatus + " Message: " + errorThrown);
	               	systemUtils.sendMessage("Server error: Please contact Systems support");
	            }
			};

			systemUtils.doAjax(requestObj);
		}
	};

	openDetailsDialogWindow = function(reportID) {

		if(systemUtils.validateLocalSession()) {

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

				console.log("Error: loader object not found for template!");
			}
		}
	};

	openFullNarrativeWindow = function(reportID) {

		if(systemUtils.validateLocalSession()) {

			var report = irUtils.getCachedReport(reportID);
			if(report == null) {

				// TODO: Display message in message div on dialog form?
			}

			var narrativeWindow = '<div id="full-narrative-view"><p>' + report.OffenseNarrative + '</p></div>';
			viewUtils.openModalView(narrativeWindow);
		}
	};

	editUserData = function(userID) {

		if(systemUtils.validateLocalSession()) {

			// Get the user data from the corresponding table row userID
			var userData = [];
			userData['username'] = $('td#username-' + userID).text();
			userData['email'] = $('td#email-' + userID).text();
			userData['admin'] = $('td#admin-' + userID).text();
			userData['sendType'] = $('td#sendType-' + userID).text();
			userData['userID'] = userID;

			if(userData['userID'] == SID) {

				// Only let the superuser edit their own profile
				var userProfile = irUtils.getUserProfile();
				if(userProfile.userID == SID) {
					viewUtils.openModalView(editUserTemplatePath, userData, editUser);
				}
				else {
					console.log("Only the superuser can edit this profile");
				}
			}
			else {
				viewUtils.openModalView(editUserTemplatePath, userData, editUser);
			}
		}
	};

	submitUserUpdate = function() {

		if(systemUtils.validateLocalSession()) {

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

						console.log("Server reports error when writing to the database");
						systemUtils.sendMessage("Server error: Please contact Systems support");
					}
				},
	            error: function ( jqXHR, textStatus, errorThrown ) {

	                console.log("Status: " + textStatus + " Message: " + errorThrown);
	               	systemUtils.sendMessage("Server error: Please contact Systems support");
	            }
			};

			systemUtils.doAjax(requestObj);
		}
	};

	removeUserData = function(userID) {

		if(systemUtils.validateLocalSession()) {

			if(userID != SID && confirm("Remove user?")) {

				requestObj = {

					type: "POST",
					url: service_url + _removeUserData,
					dataType: "json", 
					data: {ID : userID},
					success: function (response) {

			 			if(response.status == "success") {

			 				//systemUtils.sendMessage("User removed successfully.");
			 				systemUtils.updateSessionToken(response.token);
			 				location.reload();
			 			}
			 			else {

							console.log("Server reports database error");
							systemUtils.sendMessage("Server error: Please contact Systems support");
						}
					},
		            error: function ( jqXHR, textStatus, errorThrown ) {

		                console.log("Status: " + textStatus + " Message: " + errorThrown);
		               	systemUtils.sendMessage("Server error: Please contact Systems support");
		            }
				};

				systemUtils.doAjax(requestObj);
			}
			// else {
			// 	console.log("User remove cancelled or attempt to delete the superuser");
			// }
		}
	};

	addNewUser = function() {

		viewUtils.openModalView(editUserTemplatePath, null, addUser);
	};

	submitNewUserInfo = function() {

		if(systemUtils.validateLocalSession()) {

			// Get data from form
			var formData = $('#edit-user-data').serialize();

			requestObj = {

				type: "POST",
				url: service_url + _addUserData,
				dataType: "json", 
				data: formData,
				success: function (response) {

		 			if(response.status == "success") {

		 				// Send message
		 				systemUtils.sendMessage("User added successfully.");
		 				systemUtils.updateSessionToken(response.token);
		 				//addUser.clearFields();
		 				viewUtils.killModal();
					}
					else {

						console.log("Server reports error writing to the database");
						systemUtils.sendMessage("Server error: Please contact Systems support");
					}
				},
	            error: function ( jqXHR, textStatus, errorThrown ) {

	                console.log("Status: " + textStatus + " Message: " + errorThrown);
	               	systemUtils.sendMessage("Server error: Please contact Systems support");
	            }
			};

			systemUtils.doAjax(requestObj);
		}
	};

	searchByTrackingNumber = function() {

		if(systemUtils.validateLocalSession()) {

			var trackNum = $("#trackingNumber").val();

			// Validate
			if(trackNum == "" || isNaN(trackNum)) { // Check if value is numeric

				$("#trackingNumber").val("Please enter a number");
			}
			else if(trackNum.length > 5) { // Check if value exceeds length

				$("#trackingNumber").val("Length exceeded");
			}
			else {

				requestObj = {

					type: "GET",
					url: service_url + _searchByTrackNum,
					dataType: "json", 
					data: "id=" + trackNum,
					success: function (response) {

			 			if(response.status == "success") {

			 				systemUtils.updateSessionToken(response.token);
			 				irUtils.refreshReportsTable(response.data);
			 				$("#show-all-reports-link").show();
						}
						else {

							//systemUtils.error("searchByTrackingNumber", "Server error"); // systemUtils.error(reference, message)  TODO
							console.log("Server Error");
							systemUtils.sendMessage("Server error: Please contact Systems support");
						}
					},
		            error: function ( jqXHR, textStatus, errorThrown ) {

		                console.log("Status: " + textStatus + " Message: " + errorThrown);
		               	systemUtils.sendMessage("Server error: Please contact Systems support");
		            }
				};

				systemUtils.doAjax(requestObj);
			}
		}
	};

	// search reports
	searchByOffenseType = function() {

		if(systemUtils.validateLocalSession()) {

			var formData = {};
			formData['offenseType'] = $("#offenseType").val();
			formData['fromDate'] = $("#fromDate").val();
			formData['toDate'] = $("#toDate").val();

			requestObj = {

				type: "GET",
				url: service_url + _searchReports,
				dataType: "json", 
				data: formData,
				success: function (response) {

		 			if(response.status == "success") {

		 				systemUtils.updateSessionToken(response.token);
		 				irUtils.refreshReportsTable(response.data);
		 				$("#show-all-reports-link").show();
					}
					else {

						//systemUtils.error("searchByTrackingNumber", "Server error"); // systemUtils.error(reference, message)  TODO
						console.log("Server Error");
						systemUtils.sendMessage("Server error: Please contact Systems support");
					}
				},
	            error: function ( jqXHR, textStatus, errorThrown ) {

	                console.log("Status: " + textStatus + " Message: " + errorThrown);
	               	systemUtils.sendMessage("Server error: Please contact Systems support");
	            }
			};

			systemUtils.doAjax(requestObj);
		}
	};

	return {

		submitIncidentReportForm: function() {

			submitIncidentReportForm();
		},
		editIncidentReport: function() {

			editIncidentReport();
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
		},
		submitNewUserInfo: function() {

			submitNewUserInfo();
		},
		searchByTrackingNumber: function() {

			searchByTrackingNumber();
		},
		resetReportsSearch: function() {

			$('#show-all-reports-link').hide();
			irUtils.clearReportsSearchForm();
			irUtils.refreshReportsTable();
		},
		searchByOffenseType: function() {

			searchByOffenseType();
		}
	};

}(jQuery))