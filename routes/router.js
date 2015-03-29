$(function() {

    function clearPanel(){
        // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
    }

    Path.map("#/login").to(function(){
        
        // check for local session?
        
        // Disable login route if content has not been loaded yet
        if(/*$('#content').children().length > 0*/true) {   // DEV no modal, just clear content...

            loginView.doModal();
        }
        else {

            window.location.href = '#/home';
        }
    }); 

    Path.map("#/home").to(function(){
        
        systemUtils.initFrame();
        $("#content").load('templates/home.html');
        systemUtils.validateLocalSession();
    }); 

    Path.map("#/dashboard").to(function(){
        
        // Verify session

        alert("dashboard route");
    }); 

    Path.root("#/home");
    Path.listen();
});