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
    }); 

    Path.map("#/home").to(function(){

        systemUtils.validateLocalSession(); 
        viewUtils.renderTemplate('home');
    }); 

    Path.map("#/dashboard").to(function(){
        
        systemUtils.validateLocalSession(); 
        if(systemUtils.isValidSession()) {

            // Get data from cache.  If cache empty, reload dashboard 
            var data = systemUtils.getIncidentReports();
            if(data == null) {

                systemUtils.loadDashboard();
            }
            viewUtils.renderTemplate('dashboard',data); // if not null but bad, server will return message to dashboard.init(), which will display it in div
        }
        else {

            $("#main").html("<h2>401 Forbidden</h2>");
            viewUtils.setURL("error");
        }
    }); 

    Path.map("#/test").to(function(){

        testLibFunctions.genericTestBlock();
    }); 

    systemUtils.initIRApp();
    
    Path.root("#/home");
    Path.listen();
});