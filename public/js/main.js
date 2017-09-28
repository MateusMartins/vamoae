jQuery(document).ready(function () {

	const base_url = "http://localhost:4200/";

	$('.modal').modal();
	
	var Main = {
		// Init Function
		init: function (params) {
			this.params = params;
			this.bindUI();
			this.initNavSlider();
		},

		bindUI: function () {
			var that = this;

			// Destroy User Session
			$("#btn_user_info_sair").on('click', function () {
				that.checkUserLoggedin();
			});

			// Calling Create Document Modal
			$("#open-modal-login-service").on("click",function(){
				$("#modal-login-service").modal('open');
			});

		}, // End Bind UI

		checkUserLoggedin: function () {
			that = this;
			var key = "arrUserData";
			if (localStorage.getItem(key)) {
				localStorage.removeItem(key);
				window.location.href = base_url + 'login.html';
			}
		},

		initNavSlider: function () {
			jQuery('.sidenav-toggle').sideNav();

			document.addEventListener("DOMContentLoaded", function () {
				$('.preloader-background').delay(1700).fadeOut('slow');

				$('.preloader-wrapper')
					.delay(1700)
					.fadeOut();
			});
		}

	}; // Main Object

	Main.init({});
});