$(function() {

    function clearPanel(){
        // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
    }

    Path.map("#/login").to(function(){
        
        // check for local session?

        systemUtils.renderTemplate('login');
    }); 

    Path.map("#/logout").to(function(){

        systemUtils.renderTemplate('home');
        systemUtils.logout(); // Will set menu links.  
    }); 

    Path.map("#/home").to(function(){

        systemUtils.renderTemplate('home');
        systemUtils.validateLocalSession(); // Will set menu links.  
    }); 

    Path.map("#/dashboard").to(function(){
        
        if(sessionStorage.getItem("user_token") != null) {

            systemUtils.renderTemplate('dashboard'); // if not null but bad, server will return message to dashboard.init(), which will display it in div
        }
        else {

            $("#main").html("<h2>401 Forbidden</h2>");
        }

        // have to assume token is valid if present... 
        // DASHBOARD can return invalid, expired, or the data
        // if expired show msg
        // if invalid load login
        // if ok render dashboard


        // dashboard renderTemplate:  will load dashboar template, but the render process will bomb out when the server returns 'invalid header' response.
        // At that point a message can be displayed and/or #content can be cleared or go to /login
        // dashboard.init():
        //calls server for IR data, doAjax passes header.  If server returns invalid, go to /login
        // init() can clear content and display error msg
    }); 

    systemUtils.initIRApp();
    
    Path.root("#/home");
    Path.listen();
});