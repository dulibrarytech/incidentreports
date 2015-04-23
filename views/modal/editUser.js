editUser = {

	render: function(data) {

		$('input#userName').val(data['username']);
		$('input#userEmail').val(data['email']);

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
	}
};