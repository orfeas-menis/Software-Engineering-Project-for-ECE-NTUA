$(document).ready(function(){
    console.log("we are ok!");
    /*var token = localStorage.getItem("token")
    if (token == null){
        alert("You must be logged in to add new product")
        $(location).attr("href", "/login");

    }*/    
});

var home = true;
var add_price = false;

$("#Home").on("click",function(event){
    console.log("vvvvvvvvvvvvvvvvvvvv")
    if(home == false)
    {
        home = true;
        add_price =  false;
        $(location).attr("href", "/");
    }
    
})

$("#Account").on("click",function(event){
    $(location).attr("href", "/");
})

$("#AddPrice").on("click",function(event){
    $(location).attr("href", "/");
})

$("#About").on("click",function(event){
    $(location).attr("href", "/");
})

$("#Contact").on("click",function(event){
    $(location).attr("href", "/");
})