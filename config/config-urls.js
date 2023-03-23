var pathArray = window.location.href.split( '/' );
var protocol = isSsl == true ? "https://" : "http://";
var	base_url  = protocol + location.host + "/" + appFolder
var service_url = protocol + location.host + "/" + serviceURL + "/";

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
var _searchIRFormAutoSuggest = "search/complete";
var _validateTokenString = "login/validateToken";
