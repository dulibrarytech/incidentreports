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

		$("#incident-report").submit(function(event) {

			
		});
	},

	addFormValidation: function() {

		alert("adding vaidation");
		$("#incident-report").validate({
		   rules: {
		     dateOfReport: {
		     	required: true
		     },
		     reportCompletedBy: {
		     	required: true
		     },
		     title: {
		     	required: true
		     },
		     department: {
		     	required: true
		     },
		     extension: {
		     	required: true
		     },
		     dateOfOffense: {
		     	required: true
		     },
		     timeOfOffense: {
		     	required: true
		     },
		     natureOfOffense: {
		     	required: true
		     },
		     locationOfOffense: {
		     	required: true
		     },
		     offenseNarrative: {
		     	required: true
		     },

		     victimName: {

		     },
		     victimGender: {

		     },
		     victimApproximateAge: {

		     },
		     victimRace: {

		     },
		     victimUniversityAffiliation: {

		     },

		     suspectName: {

		     },
		     suspectGender: {

		     },
		     suspectApproximateAge: {

		     },
		     suspectRace: {

		     },
		     suspectUniversityAffiliation: {

		     },
		     suspectClothing: {

		     },
		     suspectHair: {

		     },
		     suspectApproximateHeight: {

		     },
		     suspectApproximateWeight: {

		     },
		     suspectFacialHair: {

		     },
		     otherPhysicalCharacteristics: {

		     },
		   }
		 })
	},

	close: function() {

	}
};

