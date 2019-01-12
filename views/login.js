$(document).ready(function(){
    console.log("we are ok!");
    
});

$("log_button").click(function(event))
{
    event.preventDefault();

    var Data = {
        username : $("#username").val(),
        password : $("#password").val()
    }

    console.log(Data)

    $.ajax({
        url: "/observitory/api/login",
        method: "POST",
        data: Data,

        sucess: function(data,status){
            var =  token = data.token
            localStorage.setItem("token", token)
            $(location).attr("href", "/");
        },
        error: function(data,status){
            alert("wrong password or username")
            $(location).attr("href", "/login");
        }    
    })
}