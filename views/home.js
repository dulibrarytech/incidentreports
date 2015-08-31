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
			
			if($("#incident-report").valid()) {
				userUtils.submitIncidentReportForm();
				event.preventDefault();
			}
			else {
				event.preventDefault();
			}
		});
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
		     	maxlength: 30
		     },
		     title: {
		     	required: true,
		     	maxlength: 50
		     },
		     department: {
		     	required: true,
		     	maxlength: 30
		     },
		     extension: {
		     	required: true,
		     	maxlength: 20
		     },
		     dateOfOffense: {
		     	required: true,
		     	date: true
		     },
		     timeOfOffense: {
		     	required: true,
		     	maxlength: 20
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
		     	maxlength: 30
		     },
		     victimGender: {
		     	maxlength: 10
		     },
		     victimApproximateAge: {
		     	maxlength: 10
		     },
		     victimRace: {
		     	maxlength: 20
		     },
		     victimUniversityAffiliation: {
		     	maxlength: 100
		     },

		     suspectName: {
		     	maxlength: 30
		     },
		     suspectGender: {
		     	maxlength: 10
		     },
		     suspectApproximateAge: {
		     	maxlength: 10
		     },
		     suspectRace: {
		     	maxlength: 20
		     },
		     suspectUniversityAffiliation: {
		     	maxlength: 100
		     },
		     suspectClothing: {
		     	maxlength: 100
		     },
		     suspectHair: {
		     	maxlength: 30
		     },
		     suspectApproximateHeight: {
		     	maxlength: 10
		     },
		     suspectApproximateWeight: {
		     	maxlength: 10
		     },
		     suspectFacialHair: {
		     	maxlength: 100
		     },
		     otherPhysicalCharacteristics: {
		     	maxlength: 1000
		     },
		   }
		 })
	},

	close: function() {

	}
};

