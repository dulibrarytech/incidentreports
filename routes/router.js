$(function() {

    function clearPanel(){
        // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
    }

    Path.map("#/login").to(function(){
        
        // check for local session?

        systemUtils.renderTemplate('login');
    }); 

    Path.map("#/home").to(function(){

        systemUtils.renderTemplate('home');
        systemUtils.validateLocalSession(); // Will set menu links
    }); 

    Path.map("#/dashboard").to(function(){
        
        // Verify session

        alert("dashboard route");

        // dashboard renderTemplate:  will load dashboar template, but the render process will bomb out when the server returns 'invalid header' response.
        // At that point a message can be displayed and/or #content can be cleared or go to /login
        // dashboard.init():
        //calls server for IR data, doAjax passes header.  If server returns invalid, go to /login
        // do not 
    }); 

    systemUtils.initFrame();
    Path.root("#/home");
    Path.listen();
});