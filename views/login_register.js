$(document).ready(function(){
    console.log("we are ok!");
    
});

$("log_button").click(function(event){
    event.preventDefault();

    var Data = {
        username : $("#log_username").val(),
        password : $("#log_password").val()
    }

    console.log(Data)

    $.ajax({
        url: "/observitory/api/login",
        method: "POST",
        data: Data,

        sucess: function(data,status){
            var token = data.token
            localStorage.setItem("token", token)
            $(location).attr("href", "/");
        },
        error: function(data,status){
            alert("wrong password or username")
            $(location).attr("href", "/login");
        }    
    })
})

$("reg_button").click(function(event){
    event.preventDefault();

    var Data = {
        username : $("#reg_username").val(),
        email : $("#reg_email").val(),
        password : $("#reg_password").val(),
        password : $("#reg_conf_password").val()
    }

    console.log(Data)

    $.ajax({
        url: "/observitory/api/login",
        method: "POST",
        data: Data,

        sucess: function(data,status){
            var token = data.token
            localStorage.setItem("token", token)
            $(location).attr("href", "/");
        },
        error: function(data,status){
            alert("wrong password or username")
            $(location).attr("href", "/login");
        }    
    })

})