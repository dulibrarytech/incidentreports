home = {

	element: "#content",
	template: "home",

	init: function() {

		this.bindEvents();
		this.addFormValidation();
	},

	render: function() {

		// Get ir form html, append to #homepage-form div
		$.get('templates/partials/ir-form.html', function(html) {
				
			$('#homepage-form').append(html);
			homeView.init();
		});
	},

	bindEvents: function() {

		$( "#incident-report" ).submit(function( event ) {
			
			event.preventDefault();
			if($("#incident-report").valid()) {
				userUtils.submitIncidentReportForm();
			}
		});

		// Trigger submit with 'enter' keypress
		$( '#incident-report' ).bind('keypress', function(e){

		   if ( e.keyCode == 13 ) {
		     	e.preventDefault();
		     	$( "#incident-report" ).submit();
		   }
		});

		// Set focus on submit button with focusout of any form element (except button!)
		// $( "#incident-report" ).children().not("#ir-form-submit").focusout(function() {
		   
		//     $( "#ir-form-submit" ).focus();
		// });
	},

	addFormValidation: function() {

		$("#incident-report").validate({
		   rules: {
		     dateOfReport: {
		     	required: true,
		     	date: true
		     },
		     reportCompletedBy: {
		     	required: true,
		     	maxlength: 50
		     },
		     title: {
		     	required: true,
		     	maxlength: 50
		     },
		     department: {
		     	required: true,
		     	maxlength: 50
		     },
		     extension: {
		     	required: true,
		     	maxlength: 50
		     },
		     dateOfOffense: {
		     	required: true,
		     	date: true
		     },
		     timeOfOffense: {
		     	required: true,
		     	maxlength: 50
		     },
		     natureOfOffense: {
		     	required: true,
		     	maxlength: 100
		     },
		     locationOfOffense: {
		     	required: true,
		     	maxlength: 200
		     },
		     offenseNarrative: {
		     	required: true,
		     	maxlength: 1000
		     },

		     victimName: {
		     	maxlength: 50
		     },
		     victimGender: {
		     	maxlength: 50
		     },
		     victimApproximateAge: {
		     	maxlength: 50
		     },
		     victimRace: {
		     	maxlength: 50
		     },
		     victimUniversityAffiliation: {
		     	maxlength: 100
		     },

		     suspectName: {
		     	maxlength: 100
		     },
		     suspectGender: {
		     	maxlength: 50
		     },
		     suspectApproximateAge: {
		     	maxlength: 50
		     },
		     suspectRace: {
		     	maxlength: 50
		     },
		     suspectUniversityAffiliation: {
		     	maxlength: 100
		     },
		     suspectClothing: {
		     	maxlength: 100
		     },
		     suspectHair: {
		     	maxlength: 50
		     },
		     suspectApproximateHeight: {
		     	maxlength: 50
		     },
		     suspectApproximateWeight: {
		     	maxlength: 50
		     },
		     suspectFacialHair: {
		     	maxlength: 100
		     },
		     otherPhysicalCharacteristics: {
		     	maxlength: 1000
		     }
		   }
		 });
	},

	close: function() {

	}
};

