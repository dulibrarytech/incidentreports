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
var _submitIRForm = "reports/add";
var _editIR = "reports/edit";
var _submitLoginForm = "login/authenticate";
var _getReportData = "reports/all";
var _getUserData = "users/all";
var _editUserData = "users/edit";
var _removeUserData = "users/remove";
var _addUserData = "users/add";
var _searchByTrackNum = "search/id";
var _searchReports = "search/reports";
