$(document).ready(function(){
    console.log("we are ok!");
    var token = localStorage.getItem("token")
    if (token == null){
        alert("You are not logged in!")
        $(location).attr("href", "/login");

    }
});


var counter = 0;

$("#logout_form").submit(function(event){
    var x = document.forms["prod_form"];
    var token = localStorage.getItem("token")
    if (token == null){
        alert("You are not logged in!")
        $(location).attr("href", "/login");
    }
    else{
        $.ajax({
            url: "/observatory/api/logout",
            method: "POST",
            headers: {
                "X-OBSERVATORY-AUTH" : token
            },

            success: function(data,status){
                localStorage.removeItem("token")
                var x = document.getElementById("snackbar");
                x.innerHTML = "Logged out succesfully!"
                x.className = "show";
                                  // After 3 seconds, remove the show class from DIV
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                $(location).attr("href", "/");

                },
            error: function(data,status){
                if (data.status == 403){
                    localStorage.removeItem("token")
                    alert("Your login time has expired. Please login again!")
                    $(location).attr("href", "/login");

                }
                try {
                    data  = $.parseJSON(data.responseText)
                } catch (e) {
                    data = {message: "An error occured!"}
                }
                var x = document.getElementById("snackbar");
                if (data.message){
                    x.innerHTML = data.message
                }
                else{
                    x.innerHTML = "Wrong Input!"
                }
                x.className = "show";

                // After 3 seconds, remove the show class from DIV
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                window.location.assign("/");
            }
        })
    }


    return false;
})
