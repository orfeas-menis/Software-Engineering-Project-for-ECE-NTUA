$(document).ready(function(){
    console.log("we are ok!");
    var token = localStorage.getItem("token")
    if (token == null){
        alert("You must be logged in to check your account")
        $(location).attr("href", "/login");
    }
    else{
        $.ajax({
            url:"/userManagement/whoami",
            method: "GET",
            headers: {
                "X-OBSERVATORY-AUTH": token
            },
            success: function(response,status) {
                console.log("All good man!")
                console.log(response)
    
            },
            error: function(response,status){
                alert("Something went wrong")
                console.log(response)
            }
        })
    }
        
});