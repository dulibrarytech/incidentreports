dashboard = {

	element: "#content",
	template: "dashboard",

	init: function() {

		alert("di");

		// Get data for dashboard sections, as arrays, via this.getDashboardData
		// hits server (FROM HERE) for session/use/data  (NO params, server will EXTRACT USERID)....
		// Server API returns "invalid" or [array of user dash data] 
		// if invalid, since this was run, assume dashboard link was present and/or 
		//     local session was not null; display message [expired maybe? login again?] in empty dashboard table frame
	}
};

