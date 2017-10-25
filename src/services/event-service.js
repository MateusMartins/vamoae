(function ($) {
	
		const API_URL = 'http://vamoae.azurewebsites.net/api/';
	
		const API_TOKEN = '/?api_token=' + localStorage.getItem("api_token");
	
		var app = $.sammy('#app', function () {
			this.use('Template');
	
			// Call Get Data on Scroll 
			this.get('#/', function (context) {
				context.swap('');
				getData(1);
				loadData(true);
			});
	
			//  Get Page Data
			function getData(page){
				this.page = page;							
				$.ajax({
					type: "GET",
					url: "http://vamoae.azurewebsites.net/api/eventos?page="+page, 
					success: function(result){
						$('.preloader-wrapper')
							.delay(1500)
							.fadeOut();
						$('.preloader-background')
							.detach();
						for (var i = 0; i < Object.keys(result.data).length; i++) {
							$("#app").append(
								'<div class="row">'+
									'<div class="col s12 m12 l9 offset-l3 xl10 push-xl2">'+
										'<article id="'+result.data[i].id+'">'+
											'<div class="card horizontal">'+
												'<div class="card-image">'+
													'<img src="'+result.data[i].img+'">'+
												'</div>'+
												
												'<div class="card-stacked">'+
													'<div class="card-content">'+
													'<h5 class="title-card">'+result.data[i].name+'</h5>'+
														'<div class="cta-favorite-event">'+
															'<a class="waves-effect waves-light btn btn-rate-like" style="background-color: #2a9090;">'+
																'<i class="material-icons right">thumb_up</i><span class="rate_like_value">'+result.data[i].like+'</span>'+
															'</a>'+
															'<a class="waves-effect waves-light btn btn-rate-deslike" style="background-color: #e83f3f;">'+
																'<i class="material-icons right">thumb_down</i><span class="rate_deslike_value">'+result.data[i].deslike+'</span>'+
															'</a>'+
														'</div>'+

														'<p>'+result.data[i].descEvento+'</p>'+
													'</div>'+

													'<div class="card-action">'+
														'<a href="#/event/'+result.data[i].id+'">Ver Mais</a>'+
													'</div>'+
												'</div>'+
											'</div>'+
										'</article>'+
									'</div>'+
								'</div>'
							);
						}
					}
				});
			}
			// Load More Data on Scroll 
			function loadData(load){
				$(window).scroll(function() {
					if($(window).scrollTop() == $(document).height() - $(window).height()) {
						this.page = page + 1;
						getData(this.page);
					}	
				});
			}
			
	
			// Router Event Detail
			this.get('#/event/:id', function (context) {
				context.swap('');
				$("#app").html('');
				var that = this;
				var event = context.params.id;
				$.ajax({
					type: "GET",
					url: "http://vamoae.azurewebsites.net/api/eventos/"+event, 
				})
				.done(function(result){
					that.item = result.event;
					that.partial('templates/event-detail.template');
				})
				.fail(function(){
					return that.notFound();
				});
			});
		});
	
		// Run Routes Function
		$(function () {
			app.run('#/');
		});
	
	})(jQuery);