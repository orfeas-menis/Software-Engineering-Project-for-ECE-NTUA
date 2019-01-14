$(document).ready(function(){
    console.log("we are ok!");
    
});

$("#log_button").click(function(event){
    console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
    event.preventDefault();

    var Data = {
        username : $("#log_username").val(),
        password : $("#log_password").val()
    }

    console.log(Data)

    $.ajax({
        url: "/observatory/api/login",
        method: "POST",
        data: Data,

        success: function(data,status){
            var token = data
<<<<<<< HEAD
            localStorage.setItem("token", data)
            $(location).attr("href", "http://localhost:8765");
=======
            localStorage.setItem("token", token)
            $(location).attr("href", "/");
>>>>>>> front
        },
        error: function(data,status){
            alert("wrong password or username")
            $(location).attr("href", "http://localhost:8765");
        }    
    })
})

$("#reg_button").click(function(event){
    event.preventDefault();

    var Data = {
        username : $("#reg_username").val(),
        email : $("#reg_email").val(),
        password : $("#reg_password").val(),
        passwordConf : $("#reg_conf_password").val()
    }

    console.log(Data)

    $.ajax({
        url: "/userManagement",
        method: "POST",
        data: Data,

        success: function(data,status){
            var token = data
            localStorage.setItem("token", token)  
            $(location).attr("href", "/");
        },
        error: function(data,status){
            alert("Something went wrong!") 
            $(location).attr("href", "/");
        }    
    })

})