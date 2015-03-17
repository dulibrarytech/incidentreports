$(function() {

    function clearPanel(){
        // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
    }

    Path.map("/").to(function(){
        alert("LL");
    }); 

    Path.map("/login").to(function(){
        alert("LL");
    }); 

    Path.map("/home").to(function(){
        alert("LL");
    }); 

    Path.map("/dashboard").to(function(){
        alert("LL");
    }); 

    Path.root("/home");
    Path.listen();
});