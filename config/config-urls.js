var pathArray = window.location.href.split( '/' );
var base_url = "";
if(pathArray[2] == "localhost") {

	base_url     = "http://" + document.domain + "/incidentReports/";
}
else {

	// baseUrl     = "https://" + document.domain + "/incidentReports/";	// PROD if SSL
	base_url     = "http://" + document.domain + "/incidentReports/";		// DEV
}

var loginUrl = base_url + "login";
var dashboardUrl = base_url + "dashboard";
var homeUrl = base_url + "home";