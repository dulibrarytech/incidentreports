$(function() {

    function clearPanel(){
        // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
    }

    Path.map("#/login").to(function(){
        
        // check for local session?

        loginView.doModal();
    }); 

    Path.map("#/home").to(function(){
        
        systemUtils.initFrame();
        $("#content").load('templates/home.html');
        systemUtils.validateLocalSession();
    }); 

    Path.map("#/dashboard").to(function(){
        
        alert("dashboard route");
    }); 

    Path.root("#/home");
    Path.listen();
});