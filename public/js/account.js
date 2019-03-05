$(document).ready(function(){
    console.log("we are ok!");
    var token = localStorage.getItem("token")
    if (token == null){
        alert("You must be logged in to check your account")
        $(location).attr("href", "/login");
    }
    var $infos = $("#info-template");
    var infotemplate = $('#info-template').html();
    $.ajax({
        url:"/userManagement/whoami",
        method: "POST",
        headers: {
            "X-OBSERVATORY-AUTH": token
        },
        success: function(infos,status) {
            var category = $infos.category;
            var adminbutton=""+ "<button>Change user category</button>";
            if (category=='admin'){
                $infos.append(adminbutton);
            }
            $infos.delegate('.editinfo', 'click',function(){
                var $div= $(this).closest('div');
                $div.find('input.username').val( $div.find('span.username').html() );
                $div.find('input.email').val( $div.find('span.email').html() );
                $div.addClass('edit');
            });
        
            $infos.delegate('.cancelinfo', 'click',function(){
                $(this).closest('div').removeClass('edit');
            });
        
            $infos.delegate('.saveinfo', 'click',function(){
                var $div= $(this).closest('div');
                var info = {
                    username: $infos.find('input.username').val(),
                    email: $infos.find('input.email').val()
                };
        
                $.ajax({
                    url:"/userManagement/userId" + $div.attr('data-id'),
                    method: "PUT",
                    headers: {
                        "X-OBSERVATORY-AUTH": token
                    },
                    success: function(infos,status) {
                        $div.find('span.username').html(info.username);
                        $div.find('span.email').html(info.email);
                        $div.removeClass('edit');
                    },
                    error: function(response,status){
        
                    }
                });
            });
        },
        error: function(response,status){
            alert("Something went wrong")
            console.log(response)
        }
    });
    
   
});