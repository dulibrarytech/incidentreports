systemUtils = (function($) {

	// Variables
	var testVal = true;
	var msgTimeout = 3000;

	// Functions
	var initIRApp,
		doAjax,
		sendMessage,

		validateLocalSession,
		submitLoginForm,
		isValidSession,
		isAdminUser,
		updateSessionToken,

		// storeIncidentReports,
		// getIncidentReports,
		// loadDashboard,
		// loadUsersView,
		// getCachedReport,

		login,
		logout;

	initIRApp = function() {

		viewUtils.initMenu();
		viewUtils.showAuthenticatedMenulinks(false);
	};

	doAjax = function(requestObj) {

		// Append local session id
		var sessionToken = sessionStorage.getItem("user_token");
		requestObj.beforeSend = function (request) {

            request.setRequestHeader("x-access-token", sessionToken);
        }

		$(document).ajaxStart(function() {
            // Disable all submit buttons
            //$(".submit-button").prop( "disabled", true );
            $.fancybox.showLoading();
        });

        $(document).ajaxStop(function() {
            // Enable all submit buttons
            //$(".submit-button").prop( "disabled", false );
            $.fancybox.hideLoading();
        });

		$.ajax(requestObj);
	};

	sendMessage = function(message,timeout) {

		// Append the window
		$('#content-wrapper').append("<div id='message-window'></div>");

		// Init the window
		var messageHTML = "<p><h4>" + message + "</h4></p>";
		$('#message-window').html(messageHTML);
		$(".submit-button").prop( "disabled", true );

		// Use default message timeout if not set
		if(typeof timeout == 'undefined') {
			timeout = msgTimeout;
		}

		// If timeout is >= 0, there is no timeout and on-click close.  Message will persist until browser reload  
		if(timeout > 0) {

			$( "#message-window" ).click(function( event ) {
			
				event.preventDefault();
				closeMessageDialog();
			});

			setTimeout( function() { 
				//$('#message-view').html("");
				closeMessageDialog();
			}, timeout);
		}
	};

	closeMessageDialog = function() {

		$('#message-window').remove();
		$(".submit-button").prop( "disabled", false );
	};

	/* Sends empty post request, server will verify header.
	*
	*  
	*/
	validateLocalSession = function() {

		var isValid = false;

		requestObj = {

			type: "POST",
			dataType: "text",
			url: service_url + "session/validate",
			success: function (response) {

				// Only update local token and menu links
				if(response != "invalid") {

					sessionStorage.setItem("user_token", response); // store token with current timestamp
					// irUtils.storeToken(response);  // FOR ABSTRACTION, that method will retrieve token per ir specs
					viewUtils.showAuthenticatedMenulinks(true, isAdminUser());
					isValid = true;
				}
				else if(isValidSession()) {

					logout();
					//$('#content').html("<h3>Session expired, please <span class='hot-text' onclick=' systemUtils.login()'>login</span> again</h3>");
					sendMessage("<h3>Session has expired, please <span class='hot-text' onclick='systemUtils.login()'>login</span> again</h3>",-1); // persist message until browser reload
					viewUtils.showAuthenticatedMenulinks(false);
					$('#content').find('*').prop('disabled',true); // Disable all on dashboard
				}
				else {

					viewUtils.showAuthenticatedMenulinks(false);
				}
			},
            error: function ( jqXHR, textStatus, errorThrown ) {

                console.log("Status: " + textStatus + " Message: " + errorThrown);
                sendMessage("Server error: Please contact Systems support");
            }
		};

		doAjax(requestObj);

		return isValid;
	};

	isValidSession = function() {

		return (sessionStorage.getItem("user_token") != null) && (irUtils.getIncidentReports() != null); 
		// check token ?
	};

	isAdminUser = function() {

		var admin = false;
		var profile = JSON.parse(sessionStorage.getItem("user_profile"));
		if(typeof profile != 'null') {
			admin = (profile['admin'] == "1");
		}
		return admin;
	};

	submitLoginForm = function() {

		// Get credentials from form, construct post string
		var uname = $('#login-uname').val();
		var passwd = $('#login-passwd').val();
		var postData = {username:uname, password:passwd};

		requestObj = {

			type: "POST",
			url: service_url + _submitLoginForm,
			dataType: "json", // json
			data: postData,
			success: function (response) {

				if(response.status == "success") {

					// establishSesion() ?
					sessionStorage.setItem("user_token", response.token);
					sessionStorage.setItem("user_profile", JSON.stringify(response.profile));
					sessionStorage.setItem("current_report_id", 0);

					viewUtils.showAuthenticatedMenulinks(true,isAdminUser());
					loginView.close();

					irUtils.loadDashboard();
				}
				else {

					sendMessage("Incorrect username or password.  Please try again");
					loginView.reset();	
				}
			},
            error: function ( jqXHR, textStatus, errorThrown ) {

                console.log("Status: " + textStatus + " Message: " + errorThrown);
               	sendMessage("Server error: Please contact Systems support");
            }
		};

		doAjax(requestObj);
	};

	updateSessionToken = function(token) {

		sessionStorage.setItem("user_token", token);
	};


	// System calls to remove session token will land here.  These calls will be initiated by ajax refusals by the server.  
	// Any messages to the user should be created elsewhere, such as in the AJAX response error handler.
	logout = function() {

		//$('#message-view').html("");
		//$('#namestring').html("");
		sessionStorage.removeItem("user_token");	
		sessionStorage.removeItem("user_profile");
		// sessionStorage.removeItem("report_data");	
		// sessionStorage.removeItem("current_report_id");
		irUtils.removeUserSessionData();

		viewUtils.showAuthenticatedMenulinks(false);
		viewUtils.killModal();
		//viewUtils.renderTemplate("home");
	};

	return {

		initIRApp: function() {

			initIRApp();
		},
		doAjax: function(requestObj) {

			doAjax(requestObj);
		},
		sendMessage: function(message,timeout) {

			sendMessage(message,timeout);
		},
		validateLocalSession: function() {

			return validateLocalSession();
		},
		submitLoginForm: function() {

			submitLoginForm();
		},
		isValidSession: function() {

			return isValidSession();
		},
		isAdminUser: function() {

			return isAdminUser();
		},
		updateSessionToken: function(token) {

			updateSessionToken(token);
		},
		// getCachedReport: function(reportID) {

		// 	return getCachedReport(reportID);
		// },
		// storeIncidentReports: function(reports) { // reports = object

		// 	storeIncidentReports(reports);
		// },
		// getIncidentReports: function() {

		// 	return getIncidentReports();
		// },
		// loadDashboard: function() {

		// 	loadDashboard();
		// },
		// loadUsersView: function() {

		// 	loadUsersView();
		// },
		login: function() {

			//loadView("login");
			closeMessageDialog();
			viewUtils.renderTemplate('login');
		},
		/* External calls to logout() land here.  Display a universal message and re-login link to the user */  
		logout: function() {

			logout();
			//viewUtils.renderTemplate('home');
			// if(sessionStorage.getItem("user_token") != null) {

			// 	// sendMessage("Goodbye");
			// 	$('#namestring').html("Goodbye");

			// 	setTimeout( function() { 
			// 		logout();
			// 		$('#content').html("<h3>You are now logged out. <span class='hot-text' onclick='systemUtils.login()'>Login</span> again</h3>");
			// 	}, 2000);
			// }
			// $('#content').html("<h3>You are now logged out. <span class='hot-text' onclick='systemUtils.login()'>Login</span> again</h3>");
		}
	};

}(jQuery));