$(document).ready(function(){
    console.log("we are ok!");
    
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

$("#add_product_button").click(function(event){
    event.preventDefault();

    var Data = {
        name : $("#product_name").val(),
        description : $("#product_desc").val(),
        category : $("#product_category").val()
    }


    var x = document.forms["prod_form"];
    var tag = "";
    var cnt = counter;
    
    for(var i=0;i <x.length;i++)
    {
        //console.log(x.elements[i].value)
        if(x.elements[i].value != "" && x.elements[i].id == "product_tags")
        {
            
            if(cnt == 0)
            {
                //console.log(cnt)
                tag += x.elements[i].value ;
            }
            else
            {
                //console.log(cnt)
                tag += x.elements[i].value+ ",";
                cnt--;
            }     
        }      
    }
    document.getElementById("demo").innerHTML = tag;
 
})


