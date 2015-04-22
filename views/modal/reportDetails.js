reportDetails = {

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

		// $("#").val(data.);
		// $("#").val(data.);
		// $("#").val(data.);
		// $("#").val(data.);
		// $("#").val(data.);
		// $("#").val(data.);
		// $("#").val(data.);
		// $("#").val(data.);
		// $("#").val(data.);
		// $("#").val(data.);
		// $("#").val(data.);
		// $("#").val(data.);
		// $("#").val(data.);
		// $("#").val(data.);
		// $("#").val(data.);
		// $("#").val(data.);
		// $("#").val(data.);
		// $("#").val(data.);
		// $("#").val(data.);
	}
};
