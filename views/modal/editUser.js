editUser = {

	render: function(data) {

		$('input#userName').val(data['username']);
		$('input#userEmail').val(data['email']);
		// $('input#userName').val(data['username']);
		// $('input#userName').val(data['username']);
	}
};