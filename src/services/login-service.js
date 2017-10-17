$(document).ready(function () {

    const api_url = "http://vamoae.azurewebsites.net/api/login";
    const base_url = window.location.host;
    
    $('.modal').modal();
    
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

            // Calling Login Modal
			$("#open-modal-login-service").on("click",function(){
				$("#modal-login-service").modal('open');
			});
        
        }, // End Bind UI

        // Send User Credentials To API
        userCredentials: function(email, password){
            that = this;
            var email = email;
            var password = password;

            $.post("http://vamoae.azurewebsites.net/api/login",
            {
                email:email,
                password:password
            })
            .done(function (response) {
                var arrUserData = [];
                arrUserData[0] = response.user[0].api_token;
                arrUserData[1] = response.user[0].name;
                arrUserData[2] = response.user[0].email;
                
                localStorage.setItem("arrUserData", JSON.stringify(arrUserData));
                Materialize.toast('Autênticado com Sucesso', 4000);
                $("#modal-login-service").modal('close');
            })
            .fail(function (response) {
                Materialize.toast('E-mail ou Senha Incorretos', 4000);
            });
        }

    }; // Login Object

    Login.init({});
});



