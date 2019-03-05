var visited = false;
var token;
$(document).ready(function(){
    console.log("we are ok!");
    token = localStorage.getItem("token")
    if (token == null){
        alert("You must be logged in to add new product")
        $(location).attr("href", "/login");
    }
    else
    {
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
    }    
});

var id;
$('#userSearch').click(function(e){
    event.preventDefault();
    id = document.getElementById('user_id').value ;
    var token = localStorage.getItem("token")
    //console.log(id)

    $.ajax({
        url: "/userManagement/"+id,
        method: "GET",
        headers: {
            "X-OBSERVATORY-AUTH" : token
        },

        success: function(response,status){
            console.log(response)
            var jsonstring = "";
            for(var key in response)
            {
                jsonstring+= ""+key+": "+response[key]+"</br>";
            }
            $("#userinfo").append(jsonstring)
            
            /*$.each(response, function(i,data){
                $("#userinfo").append("<p value='"+data+"'>"+data.name+"</p>")
            })*/
        },

        error: function(response,status){
            alert("this user-id doesn't exist")
            $(location).attr("href", "/");
        }

    })
});

var user_cat;
$('#category_select').click(function(){
     user_cat = document.getElementById('categories').value;
})

$('#category_change_sumbit').click(function(){
    var admin_pas = document.getElementById('admin_password').value;
    var Data = {
        category: user_cat,
        password: admin_pas.trim() 
    }

    $.ajax({
       url: "/userManagement/"+id,
       method: "PUT",
       headers: {
           "X-OBSERVATORY-AUTH" : token
       },
       data: Data,

       success: function(data,status){
           alert("category of user with id: "+id+" changed succesfully to "+user_cat)
           $(location).attr("href", "/");
       },

       error: function(data,status){
           alert("an error occured")
           $(location).attr("href", "/");
       }

   })

})

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