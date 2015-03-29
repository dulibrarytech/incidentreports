systemUtils = (function($) {

	var testVal = true;
	var msgTimeout = 3000;

	var doAjax,
		sendMessage,
		validateLocalSession,
		submitLoginForm,
		initFrame,
		renderTemplate,
		login,
		logout;

	var viewFrame = "#content";

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

	sendMessage = function(message) {

		$('#message-view').html("");
		$('#message-view').html(message);
		
		setTimeout( function() { 
			$('#message-view').html("");
		}, msgTimeout);
	};

	validateLocalSession = function() {

		var sessionToken = sessionStorage.getItem("user_token");
		var postData = {token:sessionToken};
		requestObj = {

			type: "POST",
			dataType: "text",
			data: postData,
			url: service_url + "session/validate",
			success: function (response) {

				if(response != "invalid") {

					// Store updated token, load dashboard view
					//sessionStorage.setItem("user_token", response);
					//loadView("home");
				}
				else if(sessionToken != null) {

					//logout();
					$('#content').html("<h3>Session expired, please <span class='hot-text' onclick=' systemUtils.login()'>login</span> again</h3>");
				}
				else {

					//loadView("login");
					
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

				alert(response);
				if(response != "invalid") {

					// Store updated token, load dashboard view
					//sessionStorage.setItem("user_token", response.token);
					//sessionStorage.setItem("user_profile", JSON.stringify(response.profile));
					//loadView("home");
					//sendMessage("Authentication successful");

					// TODO unhide dashboard link, home link, hide login
				}
				else {

					sendMessage("Incorrect username or password.  Please try again");
					//loadView("login");
				}
			},
            error: function ( jqXHR, textStatus, errorThrown ) {

                console.log("submitLoginForm Status: " + textStatus + " Message: " + errorThrown);
               	sendMessage("Server error: Please contact Systems support");
            }
		};

		doAjax(requestObj);

		// Clear form
		$('#login-uname').val("");
		$('#login-passwd').val("");
	};

	initFrame = function() {

		$('#menu-items').append('<a href="#/home" id="home-link">Home</a><a href="#/login" id="login-link">Login</a><a href="#/dashboard" id="dashboard-link">Dashboard</a>');
		$('#home-link').hide();
		$('#dashboard-link').hide();
	};

	renderTemplate = function(template) {

		$(viewFrame).empty();
		$.get('templates/' + template + '.html', function(data) {
			
			$(viewFrame).append(data);
			var view = window[template];
			view.init();
		});
	};

	// System calls to remove session token will land here.  These calls will be initiated by ajax refusals by the server.  
	// Any messages to the user should be created elsewhere, such as in the AJAX response error handler.
	logout = function() {

		$('#message-view').html("");
			
		$('#namestring').html("");
		sessionStorage.removeItem("user_token");		
	};

	return {

		doAjax: function(requestObj) {

			doAjax(requestObj);
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
		initFrame: function() {

			initFrame();
		},
		renderTemplate: function(template) {

			renderTemplate(template);
		},
		login: function() {

			alert("login");
			//loadView("login");
			//window.location.replace(base_url);
		},
		/* External calls to logout() land here.  Display a universal message and re-login link to the user */  
		logout: function() {

			if(sessionStorage.getItem("user_token") != null) {

				// sendMessage("Goodbye");
				$('#namestring').html("Goodbye");

				setTimeout( function() { 
					logout();
					$('#content').html("<h3>You are now logged out. <span class='hot-text' onclick='systemUtils.login()'>Login</span> again</h3>");
				}, 2000);
			}
			// $('#content').html("<h3>You are now logged out. <span class='hot-text' onclick='systemUtils.login()'>Login</span> again</h3>");
		}
	};

}(jQuery));