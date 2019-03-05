$(document).ready(function(){
    console.log("we are ok!");
    var token = localStorage.getItem("token")
    if (token == null){
        alert("You must be logged in to check your account")
        $(location).attr("href", "/login");
    }
    var $infos = $("#info-template");
    $.ajax({
        url:"/userManagement/whoami",
        method: "POST",
        headers: {
            "X-OBSERVATORY-AUTH": token
        },
        success: function(infos,status) {
            var category = infos.category;
            var id = infos.id;
            console.log(infos)
            if (category=="admin"){
                $('#adminbutton').append('<button>Change user category</button>');
            }
            $('#username').append('<p id="user1">Username: <b>'+infos.username+'</b></p>');
            $('#email').append('<p id="email1">Email: <b>'+infos.email+'</b></p>');
            $('#category').append('<p>Category: <b>'+infos.category+'</b></p>');
            $('#cancelbutton').addClass('hidden');
            $('#savebutton').addClass('hidden');
            $infos.delegate('.editinfo', 'click',function(){
                var $div= $(this).closest('div');
                $div.addClass('edit');
                $('#userinput').attr('placeholder',infos.username).removeClass('hidden');
                $('#user1').addClass('hidden');
                $('#emailinput').attr('placeholder',infos.email).removeClass('hidden');
                $('#email1').addClass('hidden');
                $('#editbutton').addClass('hidden');
                $('#cancelbutton').removeClass('hidden');
                $('#savebutton').removeClass('hidden');
                
            });
        
            $infos.delegate('.cancelinfo', 'click',function(){
                $('#userinput').addClass('hidden');
                $('#emailinput').addClass('hidden');
                $('#user1').removeClass('hidden');
                $('#email1').removeClass('hidden');
                $('#editbutton').removeClass('hidden');
                $('#cancelbutton').addClass('hidden');
                $('#savebutton').addClass('hidden');

            });
        
            $infos.delegate('.saveinfo', 'click',function(){
                console.log($('#newinput').html())
                var info = {
                    username: $('newuser').html(),
                    email: $('#newemail').val()
                };
        
                $.ajax({
                    url:"/userManagement/",
                    method: "PATCH",
                    headers: {
                        "X-OBSERVATORY-AUTH": token
                    },
                    success: function(infos,status) {
                        $div.find('span.email').html(info.email);
                        $div.removeClass('edit');
                    },
                    error: function(response,status){
                        alert("Something went not right")
                    }
                });
            });
        },
        error: function(response,status){
            alert("Something went wrong")
            console.log(response)
        }
    });
    $('#adminbutton').click(function(){
        $(location).attr("href", "/changeusercategory");
    })
});