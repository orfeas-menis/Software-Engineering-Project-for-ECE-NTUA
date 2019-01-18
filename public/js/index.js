$(document).ready(function(){
    console.log("we are ok!");
    /*var token = localStorage.getItem("token")
    if (token == null){
        alert("You must be logged in to add new product")
        $(location).attr("href", "/login");

    }*/    
});


$(".slide").on("click", "a" ,function(event){
    console.log("vvvvvvvvvvvvvvvvvvvv")
    document.getElementById("menu").style.width = "250px";
    document.getElementById("content").style.marginLeft = "250px";
})