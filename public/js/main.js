jQuery(document).ready(function () {

	const KEY = "arrUserData";
	$('.modal').modal();

	var Main = {
		// Init Function
		init: function (params) {
			this.params = params;
			this.bindUI();
			this.setUserData();
			this.initNavSlider();
		},

		bindUI: function () {
			var that = this;

			// Destroy User Session
			$("#btn_user_info_sair").on('click', function () {
				that.checkUserLoggedin();
			});

		}, // End Bind UI

		checkUserLoggedin: function () {
			if (localStorage.getItem(KEY)) {
				localStorage.removeItem(KEY);
				Materialize.toast('Deslogado com sucesso', 4000);
			}
		},

		setUserData: function(){
			if (localStorage.getItem(KEY)) {
				const UserData = JSON.parse(localStorage.getItem(KEY));
				$("#user_name").html(UserData[1]);
				$("#user_email").html(UserData[2]);
				
			}
		},

		initNavSlider: function () {
			jQuery('.sidenav-toggle').sideNav();
		}

	}; // Main Object

	Main.init({});
});