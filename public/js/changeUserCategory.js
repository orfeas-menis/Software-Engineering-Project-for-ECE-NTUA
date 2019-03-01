$(document).ready(function(){
    console.log("we are ok!");
    var token = localStorage.getItem("token")
    if (token == null){
        alert("You must be logged in to add new product")
        $(location).attr("href", "/login");

    }    
});


var visited = false;
$('#user_category').click(function(){
    
    console.log("its working")
    $.ajax({
        url: "/alters/userCategories",
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