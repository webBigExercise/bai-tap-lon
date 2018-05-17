(function($){
    
    var url = 'localhost:3000/api/login';

    $('#submit-btn').on('click', function(){
        var mail = $('#input-email').val();
        var password = $('#input-password').val();

        $.ajax({
            url: url,
            type: 'POST',
            data: {
                mail: mail,
                password: password
            },
            success: function(resp){
                resp = JSON.parse(resp);

                //save token 
                localStorage.setItem('jwt-token',resp.token);
                
                //redirect to main app
                location.replace('http://localhost:3000/app');
            },
            error: function (err){
                err = JSON.parse(err);

                $('#message').html(err.message);
            }
        })
    });

    $('input').on('focus', function(){
        $('#message').html('');
        console.log($('#message'));
        
    })

})(jQuery)