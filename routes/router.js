$(function() {

    Path.map("#/login").to(function(){
        
        if(systemUtils.isValidSession() != false) {
            window.location.replace('/'); //home
        }
        window.location.replace(`${ssoUrl}?app_url=${ssoResponseUrl || "unset_sso_redirect_url"}`); //sso
    }); 

    Path.map("#/loginSSO/:token").to(function(params){

        let token = params.token || null;
        systemUtils.login(token);
    }); 

    Path.map("#/logout").to(function(){

        systemUtils.logout(); 
    }); 

    Path.map("#/home").to(function(){
        
        viewUtils.renderTemplate('home');
    }); 

    Path.map("#/dashboard").to(function(){
        
        if(systemUtils.validateLocalSession()) {

            // Get data from cache.  If cache empty, reload dashboard 
            var data = irUtils.getIncidentReports();
            if(data == null) {

                irUtils.loadDashboard();
            }
            viewUtils.renderTemplate('dashboard',data); 
        }
    }); 

    Path.map("#/users").to(function(){
         
        if(systemUtils.validateLocalSession()) {
           
            irUtils.loadUsersView();
        }
    }); 

    Path.map("#/test").to(function(){

        if(systemUtils.isAdminUser()) {
            testLibFunctions.genericTestBlock();
        }
    }); 

    systemUtils.initIRApp();
    
    Path.root("#/home");
    Path.listen();
});