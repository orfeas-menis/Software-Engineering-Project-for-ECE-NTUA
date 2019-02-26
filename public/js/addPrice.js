$(document).ready(function(){
    console.log("we are ok!");
    /*var token = localStorage.getItem("token")
    if (token == null){
        alert("You must be logged in to add new product")
        $(location).attr("href", "/login");

    }*/    
});

var visited = false;
$('#product_select').click(function(){
    
    console.log("its working")
    $.ajax({
        url: "/observatory/api/products",
        method: "GET",
        
        success: function(response){
            if(visited == false)
            {
                visited = true;
                var list = response.products
                $.each(list, function(i,data){
                    $("#products").append("<option value='"+data.id+"'>"+data.name+"</option>")
                })
            }      
        }
    })
}) 

$("#add_product_page_button").click(function(event){
    event.preventDefault();
    $(location).attr("href", "/");
})

