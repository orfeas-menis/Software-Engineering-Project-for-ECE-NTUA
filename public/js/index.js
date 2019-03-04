$(document).ready(function(){
    console.log("we are ok!"); 
    var visited2 = false;
    $.ajax({
        url: "/observatory/api/products",
        method: "GET",
        
        success: function(response){
            if(visited2 == false)
            {
                visited2 = true;
                var list = response.products
                $.each(list, function(i,data){
                    $("#products_drop").append("<option value='"+data.id+"'>"+data.name+"</option>")  
                })
            }      
        }
    }) 
    
    var visited = false;
    $.ajax({
        url: "/observatory/api/shops",
        method: "GET",
        
        success: function(response){
            if(visited == false)
            {
                visited = true;
                var list = response.shops
                $.each(list, function(i,data){
                    $("#shops_drop").append("<option value='"+data.id+"'>"+data.name+"</option>")
                })
            }      
        }
    })
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
        $(location).attr("href", "/account"); //gia twra to vazw na me vazei pali sto home
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
    $(location).attr("href", "/about");
})

$("#Contact").on("click",function(event){
    $(location).attr("href", "/contact");
})

var myshop;
$('#shop_select').click(function(){
     myshop = document.getElementById('shops_drop').value;
     console.log(myshop)
})

var myproduct;
$('#product_select').click(function(){
     myproduct = document.getElementById('products_drop').value;
     console.log(myproduct)
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