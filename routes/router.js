$(function() {

    function clearPanel(){
        // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
    }

    Path.map("#/login").to(function(){
        

    }); 

    Path.map("#/home").to(function(){
        
        $("#test").load('views/test-template.html', function() {alert('template load callback')});
    }); 

    Path.map("#/dashboard").to(function(){
        

    }); 

    Path.root("#/home");
    Path.listen();
});