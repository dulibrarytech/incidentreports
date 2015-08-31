reportDetails = {

	init: function(reportID) {

		this.bindEvents();
		irUtils.setCurrentReportID(reportID);
		homeView.addFormValidation();
	},

	render: function(data) {

		$("#dateOfReport").val(data.DateOfReport);
		$("#reportCompletedBy").val(data.ReportCompletedBy);
		$("#title").val(data.title);
		$("#department").val(data.Department);
		$("#extension").val(data.Extension);
		$("#dateOfOffense").val(data.DateOfOffense);
		$("#timeOfOffense").val(data.TimeOfOffense);
		$("#natureOfOffense").val(data.NatureOfOffense);

		if(data.WasCampusSafetyNotified == "Yes" || data.WasCampusSafetyNotified == "yes") {
			$("input[name=wasCampusSafetyNotified][value=Yes]").prop("checked", true);
		}
		else {
			$("input[name=wasCampusSafetyNotified][value=No]").prop("checked", true);
		}

		$("#locationOfOffense").val(data.LocationOfOffense);
		$("#offenseNarrative").val(data.OffenseNarrative);
		$("#victimName").val(data.VictimName);
		$("#victimGender").val(data.VictimGender);
		$("#victimApproximateAge").val(data.VictimApproximateAge);
		$("#victimRace").val(data.VictimRace);
		$("#victimUniversityAffiliation").val(data.VictimUniversityAffiliation);
		$("#suspectName").val(data.SuspectName);
		$("#suspectGender").val(data.SuspectGender);
		$("#suspectApproximateAge").val(data.SuspectApproximateAge);
		$("#suspectRace").val(data.SuspectRace);
		$("#suspectUniversityAffiliation").val(data.SuspectUniversityAffiliation);
		$("#suspectClothing").val(data.SuspectClothing);
		$("#suspectHair").val(data.SuspectHair);
		$("#suspectApproximateHeight").val(data.SuspectApproximateHeight);
		$("#suspectApproximateWeight").val(data.SuspectApproximateWeight);
		$("#suspectFacialHair").val(data.SuspectFacialHair);

		if(data.SuspectGlasses == "Yes" || data.SuspectGlasses == "yes") {
			$("input[name=suspectGlasses][value=Yes]").prop("checked", true);
		}
		else {
			$("input[name=suspectGlasses][value=No]").prop("checked", true);
		}

		$("#otherPhysicalCharacteristics").val(data.OtherPhysicalCharacteristics);

		this.init(data.ReportID);
	},

	bindEvents: function() {

		$( "#incident-report" ).submit(function( event ) {
			
			if($("#incident-report").valid()) {
				
				userUtils.editIncidentReport();
				event.preventDefault();
			}
			else {
				event.preventDefault();
			}
		});
	},

	close: function() {

		irUtils.setCurrentReportID(0);
	}
};
