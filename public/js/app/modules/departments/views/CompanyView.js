define([

  // Libs
  'backbone',
  '../views/DepartmentListView',  
  'text!../templates/department-company-template.html'

], function(Backbone, DepartmentListView, Template) {

	var CompanyView = Backbone.View.extend({
		
		tagName: 'div',
		
		className: 'company_name',
		
		template: _.template(Template),

		  events: {
			  	"click .company_remove"  : "deleteCompany",
			    "dblclick .company_name_in"  : "edit",
			    "keypress .edit_company"  : "updateOnEnter",
			    "blur .edit_company"      : "close"
			  },

		initialize: function() {
		     this.model.bind('change', this.render, this);
		     this.model.bind('destroy', this.remove, this);	
		     this.model.bind('all', this.render, this);
		},

		render: function() {
		     this.$el.html(this.template(this.model.toJSON()));
		     var view = new DepartmentListView({collection:this.model.get("departments")});
		     this.$el.append(view.render().$el);
		     return this;   
		},	
		   
	    edit: function() {
	        this.$el.addClass("editing");
	        this.$el.find(".edit_company").focus();
	    },
	      
	    updateOnEnter: function(e) {
	          if (e.keyCode == 13) this.close();
	    },      
	    
	    close: function() {
	        var value = this.$el.find(".edit_company").val();
	        this.model.url = '/department/company/'+this.model.attributes.id;
	        this.model.save({name:value},{validate : true});
	        this.$el.removeClass("editing");
	    }, 
		
		deleteCompany: function() {
				if(!confirm('Удалить?')) return;
			   this.model.clear();
		}
		
	});

  return CompanyView;

});