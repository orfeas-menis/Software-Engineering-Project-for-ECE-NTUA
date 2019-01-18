$(document).ready(function(){
    console.log("we are ok!");
    
});

$("#loginForm").submit(function(event){

    var Data = {
        username : $("#log_username").val().trim(),
        password : $("#log_password").val()
    }


    $.ajax({
        url: "/observatory/api/login",
        method: "POST",
        data: Data,

        success: function(data,status){
            var token = data
            localStorage.setItem("token", token)
            $(location).attr("href", "/");
        },
        error: function(data,status){
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
                x.innerHTML = "Wrong username or password!"
            }
            x.className = "show";
      
            // After 3 seconds, remove the show class from DIV
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }    
    })
    return false;
})


$('#reg_password, #reg_conf_password').on('keyup', function () {
    if ($('#reg_password').val() == "") {
        $('#message').html('Empty Password').css('color', 'black');
    } else if ($('#reg_password').val() == $('#reg_conf_password').val()) {
      $('#message').html('Matching').css('color', 'green');
    } else 
      $('#message').html('Not Matching').css('color', 'red');
  });


$("#registerForm").submit(function(event){

    var Data = {
        username : $("#reg_username").val().trim(),
        email : $("#reg_email").val(),
        password : $("#reg_password").val()
    }

    if (Data.username == "" || Data.email == "" || Data.password == ""){
        var x = document.getElementById("snackbar");
        x.innerHTML = "All fileds are required!"
        x.className = "show";
      
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    else{
        if (($("#reg_password").val() == $("#reg_conf_password").val()) && ($("#reg_password").val() != "")){
            $.ajax({
                url: "/userManagement",
                method: "POST",
                data: Data,
        
                success: function(data,status){
                    var token = data
                    localStorage.setItem("token", token)
                    $(location).attr("href", "/");
                },
                error: function(data,status){
                    var x = document.getElementById("snackbar");
                    try {
                        data  = $.parseJSON(data.responseText)
                    } catch (e) {
                        data = {message: "An error occured!"}
                    }
                    if (data.message){
                        x.innerHTML = data.message
                    }
                    else{
                        x.innerHTML = "Incorrect Input!"
                    }
                    x.className = "show";
          
                    // After 3 seconds, remove the show class from DIV
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                }    
            })
        }
        else{
            var x = document.getElementById("snackbar");
            x.innerHTML = "Password and Password Confirmation do not match"
            x.className = "show";
          
            // After 3 seconds, remove the show class from DIV
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
    }  
    return false; //we return false so as not to refresh the page at the end of the form submission
})