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
    }); 

    systemUtils.initFrame();
    Path.root("#/home");
    Path.listen();
});