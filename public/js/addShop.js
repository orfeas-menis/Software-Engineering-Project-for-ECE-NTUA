$(document).ready(function(){
    console.log("we are ok!");
    var token = localStorage.getItem("token")
    if (token == null){
        alert("You must be logged in to add new shop")
        $(location).attr("href", "/login");

    }    
});

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
        name : $("#shop_name").val(),
        address : $("#shop_addr").val(),
        lng : $("#shop_x_cord").val(),
        lat : $("#shop_y_cord").val(),
    }

    var x = document.forms["prod_form"];
    var tag = "";
    var cnt = counter;
    
    for(var i=0;i <x.elements.length;i++)
    {
        if(x.elements[i].id == "shop_tags")
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
        alert("You must be logged in to add new shop")
        $(location).attr("href", "/login");

    }
    else{
        $.ajax({
            url: "/observatory/api/shop",
            method: "POST",
            data: Data,
            headers: {
                "X-OBSERVATORY-AUTH" : token
            },
    
            success: function(data,status){
                var x = document.getElementById("snackbar");
                x.innerHTML = "Shop Added!"
                x.className = "show";
                // After 3 seconds, remove the show class from DIV
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    
                //$(location).attr("href", "/");
            },
            error: function(data,status){
                data  = $.parseJSON(data.responseText)
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