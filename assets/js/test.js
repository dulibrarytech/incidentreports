$(function() {

    function clearPanel(){
        // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
    }

    Path.map("#/login").to(function(){
        alert("LL");
    }); 

    Path.map("#/home").to(function(){
        alert("Lh");
    }); 

    Path.map("#/dashboard").to(function(){
        alert("Ld");
    }); 

    Path.root("#/home");
    Path.listen();
});