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
<<<<<<< HEAD
        $(location).attr("href", "/account"); //gia twra to vazw na me vazei pali sto home
    }  
=======
        $(location).attr("href", "/"); //gia twra to vazw na me vazei pali sto home
    }
>>>>>>> aria
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

<<<<<<< HEAD
var visited2 = false;       // ti sto kalo einai i visited kai poses forew ti thelo
$('#product_select').click(function(){
    
    console.log("its working")
    $.ajax({
        url: "/observatory/api/products",
        method: "GET",
        
        success: function(response){
            if(visited2 == false)
            {
                visited2 = true;
                var list = response.products
                $.each(list, function(i,data){
                    $("#products").append("<option value='"+data.id+"'>"+data.name+"</option>")
                })
            }      
        }
    })
}) 


var visited=false; 
$('#shop_select').click(function(){
    
    console.log("its working")
    $.ajax({
        url: "/observatory/api/shops",
        method: "GET",
        
        success: function(response){
            if(visited == false)
            {
                visited = true;
                var list = response.shops
                $.each(list, function(i,data){
                    $("#shops").append("<option value='"+data.id+"'>"+data.name+"</option>")
                })
            }      
        }
    })
})

var myshop;
$('#shop_select').click(function(){
     myshop = document.getElementById('shops').value;
})

var myproduct;
$('#product_select').click(function(){
     myproduct = document.getElementById('products').value;
})

var mytag; 
var visited3=false; 
$('#tag_search').click(function(){
    
    console.log("its working")
    $.ajax({
        url: "/observatory/api/shops",
        method: "GET",
        
        success: function(response){
            if(visited3 == false)
            {
                visited3 = true;
                var list = response.shops
                $.each(list, function(i,data){
                    $("#shops").append("<option value='"+data.id+"'>"+data.name+"</option>")
                })
            }      
        }
    })
})
$(".button-collapse").sideNav();
// SideNav Scrollbar Initialization
var sideNavScrollbar = document.querySelector('.custom-scrollbar');
Ps.initialize(sideNavScrollbar);
=======
$("#btn").click(function(event){
  window.location.assign("/login");
})
>>>>>>> aria
