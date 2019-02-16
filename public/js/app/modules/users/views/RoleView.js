define([

  // Libs
  'backbone',
  '../collections/RoleList',    
  'text!../templates/role-template.html'
  
], function(Backbone,RoleList,Template) {

	var RoleView = Backbone.View.extend({
		
		tagName: 'p',
		
		className: '',
		
		template: _.template(Template),

		  events: {
				"click input"  : "showChildrenInput",
			  },

		initialize: function() {
		     this.model.bind('change', this.render, this);
		     this.model.bind('destroy', this.remove, this);	
		     this.model.bind('all', this.render, this);
		},

		render: function() {
		     this.$el.html(this.template(this.model.toJSON()));
		     var id = this.model.attributes.id;
		     var element = this.$el;
	    	 var i = 0;
		     this.collection.forEach(function(model){
		    	 if (model.attributes.id === id) {
		    		 element.children("input").attr({"checked":"checked"});
			    	 i++;
		    	 } 
		     });
		     if (i === 0 && this.model.attributes.parent_id !== "0" && !this.collection.findWhere({id: all_roles.findWhere({id: this.model.attributes.parent_id}).attributes.id})) {
		    	 element.hide();
		    	 }
		     this.input = this.$('input');
		     return this;   
		},	
		   
	    showChildrenInput: function() {
	    	var val = this.input.val(); 
	    	if (val && val !== "2" && this.input.is(':checked')) {
	    		this.input.parent('p').children('p').show();
	    	} else {
	    		this.input.parent('p').find("p input").attr("checked", false);    		
	    		this.input.parent('p').find("p").hide();
	    	}
	    	if (val === "2") {
	    		if (this.input.is(':checked')) {
	    		this.$el.parents(".roles_user").find("p input").not(this.input).attr("checked", false);
	    		this.$el.parents(".roles_user").find("p p").hide();
	    		this.$el.parents(".roles_user").find("p input").not(this.input).attr("disabled", "disabled");
	    		} else {
	    		this.$el.parents(".roles_user").find("p input").removeAttr("disabled");
	    		}
	    	}
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

  return RoleView;

});