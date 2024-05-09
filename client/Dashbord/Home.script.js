$(document).ready(function(){
    var storedUsername = JSON.parse(localStorage.getItem("username"));
    var loginstatus = JSON.parse(localStorage.getItem("loginstatus"));
    if (storedUsername) {
        $('.username').text(storedUsername);
    }

    if(!loginstatus){
        window.location.href="../Login/index.html"
    }
});
$('#logoutbtn').click(function() {
    localStorage.clear()
    window.location.href = "../Login/index.html";
});
