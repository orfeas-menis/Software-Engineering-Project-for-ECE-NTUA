$(document).ready(function(){
    console.log("we are ok!");
    var token = localStorage.getItem("token")
    if (token == null){
        alert("You must be logged in to add new product")
        $(location).attr("href", "/login");

    }  
    else
    {
        var visited = false;
        $.ajax({
            url: "/alters/productCategories",
            method: "GET",
            headers: {
                "X-OBSERVATORY-AUTH" : token
            },
            success: function(response,status){
                if(visited == false)
                {
                    visited = true;
                    $.each(response, function(i,data){
                        $("#product_category").append("<option value='"+data+"'>"+data+"</option>")
                    })  
                }     
            },
            error: function(response,status){
                
            }
        })
    }  
});

var prod_cat;
$('#product_category_select').click(function(){
     prod_cat = document.getElementById('product_category').value;
})

var counter = 0;
$("#cell_add_button").click(function(event){
    event.preventDefault();
    
    var cell = document.getElementById("container");
    var input = document.createElement("input");
    input.type = "text";
    input.id = "product_tags";
    input.name = "product_tags";
    var br = document.createElement("br");
    cell.appendChild(input);
    cell.appendChild(br);
    counter++;
    
})

$("#cell_remove_button").click(function(event){
    event.preventDefault();

    if(counter != 0)
    {
        var cell =  document.getElementById("container");
        var flag = true;
        while(flag)
        {
            if(cell.lastChild.nodeName.toLowerCase() == "br")
            {
                cell.removeChild(cell.lastChild);
            }
            else if(cell.lastChild.nodeName.toLowerCase() == "input")
            {
                cell.removeChild(cell.lastChild);
                counter--;
                flag = false;
            }
        } 
    }
    else
    {
        alert("You haven't add any extra tag_cell")
    }
   
})

$("#prod_form").submit(function(event){
    var Data = {
        name : $("#product_name").val(),
        description : $("#product_desc").val(),
        category : prod_cat
    }

    var x = document.forms["prod_form"];
    var tag = "";
    var cnt = counter;
    
    for(var i=0;i <x.elements.length;i++)
    {
        if(x.elements[i].id == "product_tags")
        {
            if(x.elements[i].value.trim() != ""){
                if(cnt == 0)
                {
                    tag += x.elements[i].value.trim() ;
                }
                else
                {
                    tag += x.elements[i].value.trim() + ",";
                    cnt--;
                }  
            }
            else{
                cnt--;
            }       
        }      
    }
    Data.tags = tag

    var token = localStorage.getItem("token")
    if (token == null){
        alert("You must be logged in to add new product")
        $(location).attr("href", "/login");

    }
    else{
        $.ajax({
            url: "/observatory/api/products",
            method: "POST",
            data: Data,
            headers: {
                "X-OBSERVATORY-AUTH" : token
            },
    
            success: function(data,status){
                var x = document.getElementById("snackbar");
                x.innerHTML = "Product Added!"
                x.className = "show";
                // After 3 seconds, remove the show class from DIV
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                setTimeout(function () {
                    window.location.href = "/addPrice"; 
                 }, 2000);
    
                //$(location).attr("href", "/");
            },
            error: function(data,status){
                if (data.status == 403){
                    localStorage.removeItem("token")
                    alert("You must be logged in to add new product")
                    $(location).attr("href", "/login");

                }
                try {
                    data  = $.parseJSON(data.responseText)
                } catch (e) {
                    data = {message: "An error occured!"}
                }
                var x = document.getElementById("snackbar");
                if (data.message){
                    x.innerHTML = data.message
                }
                else{
                    x.innerHTML = "Wrong Input!"
                }
                x.className = "show";
          
                // After 3 seconds, remove the show class from DIV
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            }    
        })
    }
    
    
    return false;
})

var home = true;

$("#Home").on("click",function(event){
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