define([

  // Libs
  'backbone',
  '../collections/CompanyList',
  '../views/CompanyView',  
  'text!../templates/department-index-view-template.html'

], function(Backbone, CompanyList, CompanyView, Template) {

	var DepartmentIndexView = Backbone.View.extend({

		el: $("#content"),
		
		template: _.template(Template),

		events: {
		    "keypress #company":  "createOnEnter",
		},

		initialize: function() {
			this.render();
	    	this.companies = new CompanyList();
			this.input_company = this.$("#company");
			this.companies.bind('add', this.addOne, this);
		//	companies.bind('all', this.render, this);
			this.companies.fetch();
		},

		render: function() {
		     this.$el.html(this.template);
		//     return this;
		},

		addOne: function(model) {
		    var view = new CompanyView({model: model});
		    $(".company_container").append(view.render().$el);
		  },

		createOnEnter: function(e) {
		    if (e.keyCode != 13) return;
		    if (!this.input_company.val()) return;

		    this.companies.create({name: this.input_company.val()});
		    this.input_company.val('');
		  },

		});

  return DepartmentIndexView;

});