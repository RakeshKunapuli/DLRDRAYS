$(document).ready(function(){
    var loginstatus = JSON.parse(localStorage.getItem("loginstatus"))
    if (loginstatus) {
        location.href = "../Dashbord/Home.html";
    }
    $('.form').submit(function(event){
        event.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        if (username === password) {
            localStorage.setItem("username", JSON.stringify(username));
            localStorage.setItem("loginstatus", JSON.stringify(true));
            location.href = "../Dashbord/Home.html";
        } else {
            alert("Username and password do not match. Please try again.");
        }
    });
});
