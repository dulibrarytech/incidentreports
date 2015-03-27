$(function() {

    function clearPanel(){
        // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
    }

    Path.map("#/login").to(function(){
        

    }); 

    Path.map("#/home").to(function(){
        
        $("#content").load('templates/home.html');
        systemUtils.validateLocalSession();
    }); 

    Path.map("#/dashboard").to(function(){
        

    }); 

    Path.root("#/home");
    Path.listen();
});