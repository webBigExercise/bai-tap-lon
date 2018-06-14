(function($){
    
    // var url = 'localhost:3000/api/login';
    var url = '/api/login';
    function jsonfyErr(err) { return err.responseJSON }
    console.log(url);

    $('#submit-btn').on('click', function(e){
        e.preventDefault();
        var mail = $('#input-email').val();
        var password = $('#input-password').val();

        console.log(mail);
        console.log(password);
        console.log('summit');

        $.ajax({
            url,
            type: 'POST',
            data: {
                mail: mail,
                password: password
            },
            success: function (data, status) {

                console.log(data);
                console.log(data.token);
                // localStorage['jwt-token'] = data.token;
                localStorage.setItem('jwt-token', data.token);
                $('#message-success').html('success');
                $('#message-error').html('');
                location.replace('/');
            },
            error: function (err) {
                console.error(err.responseJSON)
                err = jsonfyErr(err);
                $('#message-success').html('');
                $('#message-error').html(err.message);
            }
        })

        
    });

    $('input').on('focus', function(){
        $('#message').html('');
        console.log($('#message'));
        
    })

})($)