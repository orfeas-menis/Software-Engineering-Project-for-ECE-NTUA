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
        alert("You must be logged in to see your Account")
        $(location).attr("href", "/login");
    }
    else
    {
        $(location).attr("href", "/"); //gia twra to vazw na me vazei pali sto home
    }
})

$("#AddPrice").on("click",function(event){
    $(location).attr("href", "/addprice");
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


var tok = localStorage.getItem("token")

if (tok==null){

 document.getElementById('bton').style.visibility='hidden';
 document.getElementById('btn').style.visibility='visible';
}
else{
   document.getElementById('btn').style.visibility='hidden';
   document.getElementById('bton').style.visibility='visible';
}

$("#bton").click(function(event){
  window.location.assign("/logout");
})
