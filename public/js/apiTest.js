$(document).ready(function(){
    console.log("Starting Test!"); 
    var username = "admin"
    var password = "admin"
    var token = ""
    var Data = {
        username: username,
        password: password
    }
    $.ajax({
        url: "/observatory/api/login",
        method: "POST",
        data: Data,
        success: function(data,status){
            token = data.token
            console.log("Login Successful")
            var ProdName = "Robot Test Product Name"
            var prodDesc = "This is the Robot Test Product Description"
            var prodCat = "FUEL"
            var prodTags = ["First Robot tag", "Second Robot Tag"]
            var prodId

            $.ajax({
                url: "/alters/productCategories",
                method: "GET",
                headers: {
                    "X-OBSERVATORY-AUTH" : token
                },
                success: function(data,status){
                    prodCat = data[0]
                    },
                error: function(data,status){
                }    
            })

            console.log("Adding Product")
            var Data = {
                name: ProdName,
                description: prodDesc,
                category: prodCat,
                tags: prodTags
            };
            $.ajax({
                url: "/observatory/api/products",
                method: "POST",
                data: Data,
                headers: {
                    "X-OBSERVATORY-AUTH" : token
                },

                success: function(data,status){
                    console.log(data)
                    prodId = data.id
                    flag = true
                    for (i=0; i<data.tags.length; i++){
                        if(Data.tags[i] != data.tags[i]){
                            flag = false
                        }
                    }
                    if( data.name.localeCompare(Data.name) == 0 && data.category.localeCompare(Data.category) == 0 
                    && data.description.localeCompare(Data.description) == 0 && flag && data.id && data.withdrawn == false)
                    {
                        console.log("Product Added Succesfully!")
                    }
                    else{
                        console.log("Request Succesful, Response incorrect")
                    }

                    $.ajax({
                        url: "/observatory/api/products/"+prodId,
                        method: "GET",
                        headers: {
                            "X-OBSERVATORY-AUTH" : token
                        },
        
                        success: function(data,status){
                            console.log(data)
                            flag = true
                            for (i=0; i<data.tags.length; i++){
                                if(Data.tags[i] != data.tags[i]){
                                    flag = false
                                }
                            }
                            if( data.name.localeCompare(Data.name) == 0 && data.category.localeCompare(Data.category) == 0 
                            && data.description.localeCompare(Data.description) == 0 && flag && data.id && data.withdrawn == false)
                            {
                                console.log("Product GET Succesfull!")
                            }
                            else{
                                console.log("GET Request Succesful, GET Response incorrect")
                            }
                            var Data2 = {
                                name: ProdName +" with PUT",
                                description: prodDesc + "with PUT",
                                category: prodCat,
                                tags: ["PUT TAG 1", "PUT TAG 2"]
                            }
                            console.log("PUT Full Update Start")
                            $.ajax({
                                url: "/observatory/api/products/"+prodId,
                                method: "PUT",
                                data: Data2,
                                headers: {
                                    "X-OBSERVATORY-AUTH" : token
                                },
                
                                success: function(data,status){
                                    console.log(data)
                                    flag = true
                                    for (i=0; i<data.tags.length; i++){
                                        if(Data2.tags[i] != data.tags[i]){
                                            flag = false
                                        }
                                    }
                                    if( data.name.localeCompare(Data2.name) == 0 && data.category.localeCompare(Data2.category) == 0 
                                    && data.description.localeCompare(Data2.description) == 0 && flag && data.id && data.withdrawn == false)
                                    {
                                        console.log("Product PUT Succesfull!")
                                    }
                                    else{
                                        console.log("PUT Request Succesful, PUT Response incorrect")
                                    }
                                    $.ajax({
                                        url: "/observatory/api/products/"+prodId,
                                        method: "PATCH",
                                        data: {description: "PATCH Description"},
                                        //data: {tags: ["Tag1", "tag2"]},
                                        headers: {
                                            "X-OBSERVATORY-AUTH" : token
                                        },
                        
                                        success: function(data,status){
                                            console.log(data)
                                            flag = true
                                            for (i=0; i<data.tags.length; i++){
                                                if(Data2.tags[i] != data.tags[i]){
                                                    flag = false
                                                }
                                            }
                                            if( data.name.localeCompare(Data2.name) == 0 && data.category.localeCompare(Data2.category) == 0 
                                            && data.description.localeCompare("PATCH Description") == 0 && flag && data.id && data.withdrawn == false)
                                            {
                                                console.log("Product PATCH Succesfull!")
                                            }
                                            else{
                                                console.log("PATCH Request Succesful, PATCH Response incorrect")
                                            }
                
                                            $.ajax({
                                                url: "/observatory/api/products/"+prodId,
                                                method: "DELETE",
                                                headers: {
                                                    "X-OBSERVATORY-AUTH" : token
                                                },
                                
                                                success: function(data,status){
                                                    console.log(data)
                                                    console.log("Product DELETE Succesfull!")
                                                },
                                                error: function(data,status){
                                                    console.log("DELETE Request Failed")
                                                    console.log(data)
                                                    console.log(status)
                                                }    
                                            })
                                        },
                                        error: function(data,status){
                                            console.log("PATCH Request Failed")
                                            console.log(data)
                                            console.log(status)
                                        }    
                                    })
                                },
                                error: function(data,status){
                                    console.log("PUT Request Failed")
                                    console.log(data)
                                    console.log(status)
                                }    
                            })

                        },
                        error: function(data,status){
                            console.log("GET Request Failed")
                            console.log(data)
                            console.log(status)
                        }    
                    })
                },
                error: function(data,status){
                    console.log("POST Request Failed")
                    console.log(data)
                    console.log(status)
                }    
            })


        },
        error: function(data,status){
            console.log("Login Failed!")
        }    
    })
    
});


