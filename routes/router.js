$(function() {

    function clearPanel(){
        // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
    }

    Path.map("#/login").to(function(){
        
        // check for local session.  If present do not load login view
        if(systemUtils.isValidSession() == false) {

            viewUtils.renderTemplate('login');
        }
        else {

            history.go(-1);
        }
    }); 

    Path.map("#/logout").to(function(){

        //viewUtils.renderTemplate('home');
        systemUtils.logout(); 
        viewUtils.renderTemplate('home');
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