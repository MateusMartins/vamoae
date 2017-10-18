$(document).ready(function () {

    const api_url = "http://vamoae.azurewebsites.net/api/";
    const base_url = window.location.host;
    
    var Rate = {
        //Init Function
        init: function(params) {
            this.params = params;
            this.bindUI();
        },
        bindUI: function () {
            var that = this;

            $(document).on('click', '.btn-rate-like', function (e) {
                e.stopPropagation();
                e.preventDefault();
                var idEvento = $(this).closest('article').attr("id");
                var like = 1;
                var api_token = 'GFFUWwrZH1q7PjWjtBTuytj619JDewC1orXKlP1aaqq8mlkUxe52BqCB1Evu';
                console.log(idEvento);
                console.log(like);
                console.log(api_token);
                that.rateLike(idEvento, like, api_token);
                var like_value = parseInt($(this).find('.rate_like_value').text());
                like_value += 1;
                $(this).find('.rate_like_value').text(like_value);
                $(this).prop( "disabled", true );
            });
            
            $(document).on('click', '.btn-rate-deslike', function (e) {
                e.stopPropagation();
                e.preventDefault();
                var idEvento = $(this).closest('article').attr("id");
                var deslike = 1;
                var api_token = 'GFFUWwrZH1q7PjWjtBTuytj619JDewC1orXKlP1aaqq8mlkUxe52BqCB1Evu';
                console.log(idEvento);
                console.log(deslike);
                console.log(api_token);
                that.rateDeslike(idEvento, deslike, api_token);
                var deslike_value = parseInt($(this).find('.rate_deslike_value').text());
                deslike_value += 1;
                $(this).find('.rate_deslike_value').text(deslike_value);
                console.log($('.btn-rate-like').closest($(this)));
                $(this).prop( "disabled", true );
            });

        }, //End Bind UI

        // Send User Credentials To API
        rateLike: function(idEvento, like, api_token){
            var that = this;
            var like = like;
            var idEvento = idEvento;
            var api_token = api_token;
            $.post(api_url+"like",
            {
                id:idEvento,
                like:like,
                api_token:api_token
            })
            .done(function (response) {
                Materialize.toast('Like efetuado com sucesso!', 4000);
                
            })
            .fail(function (response) {
                Materialize.toast('Não conseguimos completar esta ação, tente novamente mais tarde! :)', 4000);
            });
        },

        rateDeslike: function(idEvento, deslike, api_token){
            var deslike = deslike;
            var idEvento = idEvento;
            var api_token = api_token;
            $.post(api_url+"deslike",
            {
                id:idEvento,
                deslike:deslike,
                api_token:api_token
            })
            .done(function (response) {
                Materialize.toast('Desike efetuado com sucesso!', 4000);

            })
            .fail(function (response) {
                Materialize.toast('Não conseguimos completar esta ação, tente novamente mais tarde! :)', 4000);
            });
        }

    };  //Rate Object
    Rate.init({});
});



