systemUtils = (function($) {

	var testVal = true;
	var msgTimeout = 3000;

	var initIRApp,
		doAjax,
		initMenu,
		sendMessage,
		validateLocalSession,
		submitLoginForm,
		renderTemplate,
		showAuthenticatedMenulinks,
		login,
		logout;

	var viewFrame = "#content";

	initIRApp = function() {

		initMenu();
		showAuthenticatedMenulinks(false);
	};

	doAjax = function(requestObj) {

		// Append local session id
		var sessionToken = sessionStorage.getItem("user_token");
		requestObj.beforeSend = function (request) {

            request.setRequestHeader("x-access-token", sessionToken);
        }

		$(document).ajaxStart(function() {
            // $.fancybox.showLoading();
        });

        $(document).ajaxStop(function() {
            // $.fancybox.hideLoading();
        });

		$.ajax(requestObj);
	};

	initMenu = function() {

		$('#menu-items').append('<a href="#/home" id="home-link">Home</a><a href="#/login" id="login-link">Login</a><a href="#/dashboard" id="dashboard-link">Dashboard</a><a href="#/logout" id="logout-link">Logout</a>');
	};

	sendMessage = function(message) {

		$('#message-view').html("");
		$('#message-view').html(message);
		
		setTimeout( function() { 
			$('#message-view').html("");
		}, msgTimeout);
	};

	// Set appropriate menu links for authenticated users
	// If not valid, redirect to home and set menu links for unauthenticated user
	// If present but not valid, logout() to be safe and display 'possible expired session' message  		<-- done
	validateLocalSession = function() {

		var sessionToken = sessionStorage.getItem("user_token");
		var postData = {token:sessionToken};
		requestObj = {

			type: "POST",
			dataType: "text",
			data: postData,
			url: service_url + "session/validate",
			success: function (response) {

				// Only update local token and menu links
				if(response != "invalid") {

					//sessionStorage.setItem("user_token", response);
					showAuthenticatedMenulinks(true);
				}
				else if(sessionToken != null) {

					logout();
					$('#content').html("<h3>Session expired, please <span class='hot-text' onclick=' systemUtils.login()'>login</span> again</h3>");
					showAuthenticatedMenulinks(false);
				}
				else {

					showAuthenticatedMenulinks(false);
				}
			},
            error: function ( jqXHR, textStatus, errorThrown ) {

                console.log("validateLocalSession Status: " + textStatus + " Message: " + errorThrown);
                sendMessage("Server error: Please contact Systems support");
            }
		};

		doAjax(requestObj);
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

				if(response != "invalid") {

					alert("valid");
					// Store updated token, load dashboard view
					sessionStorage.setItem("user_token", response.token);
					sessionStorage.setItem("user_profile", JSON.stringify(response.profile));
					//loadView("home");
					//sendMessage("Authentication successful");
					showAuthenticatedMenulinks(true);

					loginView.close();
					renderTemplate("dashboard");
				}
				else {

					sendMessage("Incorrect username or password.  Please try again");
					loginView.reset();	
				}
			},
            error: function ( jqXHR, textStatus, errorThrown ) {

                console.log("submitLoginForm Status: " + textStatus + " Message: " + errorThrown);
               	sendMessage("Server error: Please contact Systems support");
            }
		};

		doAjax(requestObj);
	};

	renderTemplate = function(template) {

		$(viewFrame).empty();
		$.get('templates/' + template + '.html', function(data) {
			
			$(viewFrame).append(data);
			var view = window[template];
			if(typeof view != "undefined") {
				view.init();
			}
		});

		// var state = {
		//   "thisIsOnPopState": true
		// };
		// history.pushState(state, "Test", base_url + "#/" + template);
		// expect(history.state).toEqual(state);
	};

	showAuthenticatedMenulinks = function(show) {

		if(show == true) {

			$('#login-link').hide();
			$('#logout-link').show();
			$('#dashboard-link').show();	
		}
		else if(show == false) {

			$('#login-link').show();
			$('#logout-link').hide();
			$('#dashboard-link').hide();	
		}
	}

	// System calls to remove session token will land here.  These calls will be initiated by ajax refusals by the server.  
	// Any messages to the user should be created elsewhere, such as in the AJAX response error handler.
	logout = function() {

		//$('#message-view').html("");
		//$('#namestring').html("");
		sessionStorage.removeItem("user_token");	
		sessionStorage.removeItem("user_profile");	

		showAuthenticatedMenulinks(false);
	};

	return {

		initIRApp: function() {

			initIRApp();
		},
		doAjax: function(requestObj) {

			doAjax(requestObj);
		},
		initMenu: function() {

			initMenu();
		},
		sendMessage: function(message) {

			sendMessage(message);
		},
		validateLocalSession: function() {

			validateLocalSession();
		},
		submitLoginForm: function() {

			submitLoginForm();
		},
		renderTemplate: function(template) {

			renderTemplate(template);
		},
		login: function() {

			//loadView("login");
			renderTemplate('login');
		},
		/* External calls to logout() land here.  Display a universal message and re-login link to the user */  
		logout: function() {

			logout();
			renderTemplate('home');
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