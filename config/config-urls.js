var pathArray = window.location.href.split( '/' );
var base_url = "";
if(pathArray[2] == "localhost") {

	base_url     = "http://" + document.domain + "/incidentReports/";
}
else {

	// baseUrl     = "https://" + document.domain + "/incidentReports/";	// PROD if SSL
	base_url     = "http://" + document.domain + "/incidentReports/";		// DEV
}

var service_url = "http://" + document.domain + "/incidentReports_SERVICE/";

// Service API endpoints
var _submitIRForm = "submit/report";
var _submitLoginForm = "login/authenticate";
var _getReportData = "reports/all";