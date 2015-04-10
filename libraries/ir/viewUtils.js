viewUtils = (function($) {


	var initMenu,
		renderTemplate,
		showAuthenticatedMenulinks;

	var setURL;

		initMenu = function() {

			$('#menu-items').append('<a href="#/home" id="home-link">Home</a><a href="#/login" id="login-link">Login</a><a href="#/dashboard" id="dashboard-link">Dashboard</a><a href="#/logout" id="logout-link">Logout</a>');
		};

		renderTemplate = function(template,data) {

			if(typeof data == 'undefined') {

				data = null;
			}

			$(viewFrame).empty();
			$.get('templates/' + template + '.html', function(html) {
				
				$(viewFrame).append(html);
				var view = window[template];
				if(typeof view != "undefined") {
					view.init(data);
				}
				else {
					console.log("renderTemplate() error: view not found for template '" + template + "'!");
				}
			});

			setURL("#/" + template);
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
		};

		setURL = function(url) {

			history.pushState('', '', base_url + url);
		};

	return {

		initMenu: function() {

			initMenu();
		},
		renderTemplate: function(template,data) {

			renderTemplate(template,data);
		},
		showAuthenticatedMenulinks: function(show) {

			showAuthenticatedMenulinks(show);
		},
		setURL: function(url) {

			setURL(url);
		}
	};

}(jQuery))