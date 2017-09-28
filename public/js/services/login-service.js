$(document).ready(function () {

    const api_url = "http://tsi.api.viniciusoliveira.org/public/api/login";
    const base_url = "http://localhost:4200/";
    
    var Login = {
        // Init Function
        init: function(params) {
            this.params = params;
            this.bindUI();
        },

        bindUI: function () {

            var that = this;
            $('#btn-login-service').on('click', function (event) {
                event.stopPropagation();
                var email    = $('#login-email').val();
                var password = $('#login-password').val();
                
                that.userCredentials(email, password);
            });
        
        }, // End Bind UI

        // Send User Credentials To API
        userCredentials: function(email, password){
            that = this;
            var email = email;
            var password = password;
            
            // Logging Users with Laravel RESTFull Api Data
            $.ajax({
                type: "POST",
                url: api_url,
                data: JSON.stringify({ email: email, password: password }),
                contentType: "application/json",
            })
            .done(function (response) {
                var arrUserData = [];
                arrUserData[0] = response.user[0].api_token;
                arrUserData[1] = response.user[0].name;
                arrUserData[2] = response.user[0].email;
                
                localStorage.setItem("arrUserData", JSON.stringify(arrUserData));

                if( localStorage.getItem("arrUserData") ){
                    window.location.href = base_url + 'index.html';
                }
            })
            .fail(function (response) {
                Materialize.toast('E-mail ou Senha Incorretos', 4000);
            });
        }

    }; // Login Object

    Login.init({});
});



