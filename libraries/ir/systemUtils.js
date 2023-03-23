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
		if(sessionToken) {
			requestObj.beforeSend = function (request) {
				request.setRequestHeader("x-access-token", sessionToken);
			}
		}

		$(document).ajaxStart(function() {
            // Disable all submit buttons
            //$(".submit-button").prop( "disabled", true );
            $("#wrapper").append('<div id="blockout"></div>');
            $.fancybox.showLoading();
        });

        $(document).ajaxStop(function() {
            // Enable all submit buttons
            //$(".submit-button").prop( "disabled", false );
            $("#blockout").remove();
            $.fancybox.hideLoading();
        });

		$.ajax(requestObj);
	};

	// Show the user a message in a modal window
	// param string message 	The message to display
	// param int timeout 		The amount of time to display the message window.  <0: persist until browser is reloaded; null: use default timeout; >0 set timeout to this value
	// param boolean blackout	Blackout the UI under the message window (disable all)
	sendMessage = function(message,timeout,blackout) {

		// Append the window
		$('#content-wrapper').append("<div id='message-window'></div>");

		// Init the window
		var messageHTML = "<p><h4>" + message + "</h4></p>";
		$('#message-window').html(messageHTML);
		$(".submit-button").prop( "disabled", true );

		// Use default message timeout if not set
		if(typeof timeout == 'undefined' || timeout == null) {
			timeout = msgTimeout;
		}

		// Blackout and disable the UI under the message window
		if(typeof blackout != 'undefined' && blackout == true) {
			$("#wrapper").append('<div id="blackout"></div>');
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
		$('#blackout').remove();
	};

	// Sends empty post request, server will verify header.
	// Will store updated token received from server if current token was valid
	// Will lock UI and display expiration message if token was valid but expired
	// Will redirect to 403 if token was invalid
	validateLocalSession = function() {

		console.log("TEST validateLocalSession")

		var isValid = false;
		requestObj = {

			type: "POST",
			dataType: "text",
			url: service_url + "session/validate",
			async: false,
			success: function (response) {

				// Only update local token and menu links
				if(response != "invalid") {

					sessionStorage.setItem("user_token", response); // store token with current timestamp
					// irUtils.storeToken(response);  // FOR ABSTRACTION, that method will retrieve token per ir specs
					viewUtils.showAuthenticatedMenulinks(true, isAdminUser());
					isValid = true;
				}
				else if(isValidSession()) { // If there is a local session, but server responds with invalid, assume it is expired

					//$('#content').html("<h3>Session expired, please <span class='hot-text' onclick=' systemUtils.login()'>login</span> again</h3>");
					var messageText = "<h3>Session has expired, please <span class='hot-text' onclick='systemUtils.login()'>login</span> again</h3>";
					//var messageText = "<h3>Session has expired, please <a href='#/login' id='login-link'>login</a> again</h3>";
					sendMessage(messageText,-1,true); // persist message until browser reload
					viewUtils.showAuthenticatedMenulinks(false);

					// sso
					// redirect to sso IDP
				}
				else {

					$("#main").html("<h2>403 Unauthorized</h2>");
            		viewUtils.setURL("error");
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

	login = function(token) {

		if(token != null) {
			// Send to server to validate
			let requestObj = {

				type: "GET",
				url: service_url + _validateTokenString,
				dataType: "json", 
				data: {token},
				success: function (response) {

					if(response.status == "success") {
						sessionStorage.setItem("user_token", response.token);
						sessionStorage.setItem("user_profile", JSON.stringify(response.profile));
						sessionStorage.setItem("current_report_id", 0);

						viewUtils.showAuthenticatedMenulinks(true,isAdminUser());
						irUtils.loadDashboard();
					}
					else {
						console.log("Login error:", response.error);
						systemUtils.sendMessage("Server error: Please contact Systems support");
					}
				},
				error: function ( jqXHR, textStatus, errorThrown ) {

					console.log("Status: " + textStatus + " Message: " + errorThrown);
					systemUtils.sendMessage("Server error: Please contact Systems support");
				}
			};
			doAjax(requestObj);
		}
		else {
			window.location.replace('/');
		}
	};

	logout = function() {

		sessionStorage.removeItem("user_token");	
		sessionStorage.removeItem("user_profile");
		irUtils.removeUserSessionData();
		viewUtils.showAuthenticatedMenulinks(false);
		viewUtils.killModal();
		window.location.replace(ssoLogoutUrl);
	};

	return {

		initIRApp: function() {

			initIRApp();
		},
		doAjax: function(requestObj) {

			doAjax(requestObj);
		},
		sendMessage: function(message,timeout,blackout) {

			sendMessage(message,timeout,blackout);
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
		login: function(token=null) {

			login(token);
		},
		/* External calls to logout() land here.  Display a universal message and re-login link to the user */  
		logout: function() {

			logout();
		}
	};

}(jQuery));