$(document).ready(function(){
    console.log("we are ok!");   
});

var home = true;

$("#Home").on("click",function(event){
    console.log("vvvvvvvvvvvvvvvvvvvv")
    if(home == false)
    {
        home = true;
        $(location).attr("href", "/");
    }

})

$("#Account").on("click",function(event){
    var token = localStorage.getItem("token")
    if (token == null){
        alert("You must be logged in to see your account")
        $(location).attr("href", "/login");
    }
    else
    {
        $(location).attr("href", "/"); //gia twra to vazw na me vazei pali sto home
    }
})

$("#AddPrice").on("click",function(event){
    var token = localStorage.getItem("token")
    if (token == null){
        alert("You must be logged in to add price")
        $(location).attr("href", "/login");
    } 
    else
    {
       $(location).attr("href", "/addprice"); //gia twra to vazw na me vazei pali sto home
    }  
})

$("#About").on("click",function(event){
    $(location).attr("href", "/");
})

$("#Contact").on("click",function(event){
    $(location).attr("href", "/");
})

$("#btn").click(function(event){
  window.location.assign("/login");
})
