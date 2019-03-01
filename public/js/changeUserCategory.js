$(document).ready(function(){
    console.log("we are ok!");
    var token = localStorage.getItem("token")
    if (token == null){
        alert("You must be logged in to add new product")
        $(location).attr("href", "/login");

    }    
});

$('#userSearch').click(function(e){
    event.preventDefault();
    var id = document.getElementById('user_id').value ;
    console.log(id)

    /*$.ajax({
        url: "/userManagment/",
        method: "GET",
        headers: {
            "X-OBSERVATORY-AUTH" : token
        },*/

})


var visited = false;
$('#category_select').click(function(){
    var token = localStorage.getItem("token")
    $.ajax({
        url: "/alters/userCategories",
        method: "GET",
        headers: {
            "X-OBSERVATORY-AUTH" : token
        },
        
        success: function(response,status){
            if(visited == false)
            {
                visited = true;
                var list = response
                console.log(response)

                $.each(list, function(i,data){
                    $("#categories").append("<option value='"+data+"'>"+data+"</option>")
                })
            }     
        },
        error: function(response, status){
            if(response.status == 403)
            {
                alert("you must be an admin")
                $(location).attr("href", "/login");
            }
        }
        
    })
}) 