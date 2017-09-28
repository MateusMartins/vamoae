(function ($) {

	const API_URL = 'http://tsi.api.viniciusoliveira.org/public/api/';

	const API_TOKEN = '/?api_token=' + localStorage.getItem("api_token");
	
	// Token Default
	const API_TOKEN = 'GFFUWwrZH1q7PjWjtBTuytj619JDewC1orXKlP1aaqq8mlkUxe52BqCB1Evu';

	var app = $.sammy('#app', function () {
		this.use('Template');


		if (!localStorage.getItem("api_token")) {
			getUserData();
		}
		
		// Get All Documents
		this.around(function (callback) {
		 	var context = this;
		 	this.load(API_URL + 'events' + API_TOKEN)
		 		.then(function (docs) {
		 			context.docs = docs;
		 			console.log(context.docs);
		 		})
		 		.then(callback);
			});

		// Router Home/Dashboard => Render All Documents in View Template
		this.get('#/', function (context) {
			context.app.swap('');
			 
			data = JSON.parse(this.docs);
			var total_page = Math.ceil( Object.keys(data.documents).length / 10 );
			console.log(total_page);
			
			$.each(data.documents, function (i, item) {
				context.render('templates/document.template', {
						id: i,
						item: item
					})
					.appendTo(context.$element());
			});
		});

		// Router Document Detail
		this.get('#/document/:id', function (context) {

			data = JSON.parse(this.docs);

			this.item = data.documents[this.params['id'] - 1];
			if (!this.item) {
				return this.notFound();
			}
			this.partial('templates/document-detail.template');
		});

		// Router Document Detail
		this.get('#/profile/:id', function (context) {
			data = JSON.parse(this.customer);
			this.client = data.customer[0];
			if (!this.client) {
				return this.notFound();
			}
			this.partial('templates/profile.template');
		});

		// Hash Current Page
		this.before('.*', function () {
			var hash = document.location.hash;
			$("nav").find("a").removeClass("current");
			$("nav").find("a[href='" + hash + "']").addClass("current");
		});

		function getUserData(){
			// Get Client Data
			this.around(function (callback) {
				var context = this;
				this.load(API_URL + 'customer' + API_TOKEN)
					.then(function (customer) {
						context.customer = customer;
						setUserMenuInformation(context.customer);
					})
					.then(callback);
			});
		}
		// Seta os dados do usuário no menu
		function setUserMenuInformation(customer){
			data = JSON.parse(customer);
			$("#user_name").html(data.customer[0].name);
			$("#user_email").html(data.customer[0].email);
		};

	});

	// Run Routes Function
	$(function () {
		app.run('#/');
	});

})(jQuery);