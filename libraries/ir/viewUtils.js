viewUtils = (function($) {


	var initMenu,
		renderTemplate,
		showAuthenticatedMenulinks;

		initMenu = function() {

			$('#menu-items').append('<a href="#/home" id="home-link">Home</a><a href="#/login" id="login-link">Login</a><a href="#/dashboard" id="dashboard-link">Dashboard</a><a href="#/logout" id="logout-link">Logout</a>');
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

	return {

		initMenu: function() {

			initMenu();
		},
		renderTemplate: function(template) {

			renderTemplate(template);
		},
		showAuthenticatedMenulinks: function(show) {

			showAuthenticatedMenulinks(show);
		}
	};

}(jQuery))