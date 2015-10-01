viewUtils = (function($) {

	var initMenu,
		renderTemplate,
		showAuthenticatedMenulinks,
		setURL,
		openModalView;

	var setURL;
	var viewObject = null;

		initMenu = function() {

			// Added to IR index.html main frame, for portability.
			// This object is IR independant
			//$('#menu-items').append('<a href="#/home" id="home-link">HOME</a><a href="#/login" id="login-link">LOGIN</a><a href="#/dashboard" id="dashboard-link">DASHBOARD</a><a href="#/users" id="users-link">USERS</a><a href="#/logout" id="logout-link">LOGOUT</a>');
		};

		renderTemplate = function(template,data) {

			if(typeof data == 'undefined') {

				data = null;
			}

			$(viewFrame).empty();
			$.get('templates/' + template + '.html', function(html) {
				
				$(viewFrame).append(html);

				// Get an instance of the view loader object and call its render function
				var view = window[template];
				if(typeof view != "undefined") {

					view.render(data);
				}
				else {

					console.log("Error: view not found for template '" + template + "'!");
				}
			});

			setURL("#/" + template);
		};

		showAuthenticatedMenulinks = function(show, isAdmin) {

			// Show authenticated user links
			if(show == true) {

				$('#login-link').hide();
				$('#logout-link').show();
				$('#dashboard-link').show();

				// Show admin links
				if(isAdmin == true) {

					$('#users-link').show();
				}	
			}

			// For non-authenticated users, show only Home and Logout
			else if(show == false) {

				$('#login-link').show();
				$('#logout-link').hide();
				$('#dashboard-link').hide();
				$('#users-link').hide();	
			}
		};

		setURL = function(url) {

			// if(appendToExisting == true) {

			// }
			// else
			history.pushState('', '', base_url + url);
		};

		openModalView = function(template,data,loader) { // appends template to wrapper.  Disables and shades all wrapper children

			// Store the view
			viewObject = loader;

			// Append dialog frame
			$('#main').append('<div id="modalFrame"></div>');

			// Add close button
			var closeButton = '<a onclick="killModal()" class="modal-button">close</a>';
			$('#modalFrame').append(closeButton + '<div id="modalFrameInner"></div>');

			// *** if loader is null or undefined, append template to modalFrame, ignore data ***
			if(typeof loader == 'undefined' || loader == null) {

				$('#modalFrameInner').append(template);
				$("#wrapper").append('<div id="blackout"></div>');
			}
			else {

				// Get html content from template file to display in the dialog frame, append it, and append a blackout frame to  
				// deactivate all elements other than the dialog window
				$.get(template, function(html) {
					
					$("#modalFrameInner").append(html);
					loader.render(data);
					$("#wrapper").append('<div id="blackout"></div>');
				});
			}
		};

		killModal = function() {

			// Remove 'modalFrame' div and modal blackout frame
			$('#modalFrame').remove();  
			$('#blackout').remove(); 

			// Call the view's close() method
			if(viewObject != null) {
				viewObject.close();
			}
		};

	return {

		initMenu: function() {

			initMenu();
		},
		renderTemplate: function(template,data) {

			renderTemplate(template,data);
		},
		showAuthenticatedMenulinks: function(show, isAdmin) {

			showAuthenticatedMenulinks(show, isAdmin);
		},
		setURL: function(url) {

			setURL(url);
		},
		openModalView: function(template,data,loader) { // appends template to wrapper.  Disables and shades all wrapper children

			openModalView(template,data,loader);
		},
		killModal: function() {

			killModal();
		}
	};

}(jQuery))