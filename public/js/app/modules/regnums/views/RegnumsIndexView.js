define([

  // Libs
  'backbone',
  '../collections/RegnumsList',
  '../views/RegnumView',  
  '../views/OrderCompanyListIndexView',    
  '../views/RegnumsListView',  
  '../views/PaginatedView',
  'text!../templates/regnums-index-template.html'      
  
], function(Backbone,RegnumsList,RegnumView,OrderCompanyListIndexView,RegnumsListView, PaginatedView,Template) {

	var RegnumsIndexView = Backbone.View.extend({
		
		el: $("#content"),

		template: _.template(Template),	
		
		events : {
			"change #regnum_search_face" : "filterParameter",
			"change select" : "filterParameter"
		},		
		
		initialize: function() {
			this.$el.html(Template);
			window.regnums = new RegnumsList;
			window.regnums.pager();
			var view = new PaginatedView({collection:window.regnums});
	   	    $("#pagination").html(view.render());
			window.regnums.on('all', this.render, this); 
		},
		
		render: function() {
			var collview = new RegnumsListView({collection:window.regnums});
			$("#regnum_table").html(collview.render().el);
			var departments = new OrderCompanyListIndexView({collection:window.companies,"department":$("#regnum-index-department-container").find("select").val()});
			$("#regnum-index-department-container").html(departments.render().el);
		},	
		
		filterParameter: function() {
			window.regnums.perPage = 10;
			window.regnums.currentPage = 1;			
			window.regnums.pager();
		},
		
		addOne: function(model) {
		    var view = new RegnumView({model: model});
		    this.$el.find("#regnum_table").append(view.render().el);
		}

		});

  return RegnumsIndexView;

});