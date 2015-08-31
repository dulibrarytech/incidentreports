editUser = {

	render: function(data) {

		$('input#userName').val(data['username']);
		$('input#userEmail').val(data['email']);

		// Store userID for PUT
		$('form#edit-user-data').attr("data-internalid", data['userID']);

		if(data['admin'] == 'Yes') {
			$('#admin :nth-child(1)').prop('selected', true);
		}
		else {
			$('#admin :nth-child(2)').prop('selected', true);
		}

		if(data['sendType'] == 'to') {
			$('#sendType :nth-child(1)').prop('selected', true);
		}
		else if(data['sendType'] == 'cc') {
			$('#sendType :nth-child(2)').prop('selected', true);
		}
		else {
			$('#sendType :nth-child(3)').prop('selected', true);
		}

		editUser.addFormValidation();
		editUser.bindEvents();
	},

	bindEvents: function() {

		$( "#save-user-data" ).click(function( event ) {
			
			event.preventDefault();
			//var form = $("#edit-user-data").valid();
			if($("#edit-user-data").valid()) {  //$("#edit-user-data").valid()
				
				userUtils.submitUserUpdate();
			}
		});
	},

	addFormValidation: function() {

		$("#edit-user-data").validate({
		   rules: {
		     userName: {
		     	required: true,
		     	maxlength: 50
		     },
		     userEmail: {
		     	required: true,
		     	maxlength: 100
		     }
		   }
		 });
	},

	close: function() {
		
	}
};

addUser = {

	render: function(data) {

		$('#admin :nth-child(2)').prop('selected', true);
		$("form#edit-user-data input[value='Save']").attr("value", "Add User");
		this.init();
	},

	// Refactor the edit user template for user add
	init: function() {

		//$("form#edit-user-data input[value='Save']").attr("value", "Add User");
		//$("form#edit-user-data input[value='Add User']").attr("onclick", "userUtils.submitNewUserInfo()");
		editUser.addFormValidation();
		this.bindEvents();
	},

	bindEvents: function() {

		$( "#save-user-data" ).click(function( event ) {
			
			event.preventDefault();
			if($("#edit-user-data").valid()) {  
				
				userUtils.submitNewUserInfo();
			}
		});
	},

	clearFields: function() {

		$('form input#userName').val("");
		$('form input#userEmail').val("");
		$('#admin :nth-child(2)').prop('selected', true); // Set admin to 'No'
		$('#sendType :nth-child(1)').prop('selected', true); // Set sendType to 'to'
	},

	close: function() {

		location.reload();
	}
};