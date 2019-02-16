define([

  // Libs
  'backbone', 
  '../views/RoleView',
  '../collections/RoleList',  
  
], function(Backbone,RoleView,RoleList) {

	var RoleListView = Backbone.View.extend({
		
		className: "roles_user",
		events: {
		},
	 
	    initialize: function() {
	    	window.all_roles = new RoleList;
	    	all_roles.reset(all_roles_data);
	    	window.roles = new RoleList;
	    	roles.reset(roles_data);	    	
	    },
	    
	    recurs: function(val,model,viewel) {
	    	var view = '';
	    	var th = this;
	    	var coll = this.collection;

	    	all_roles.each(function(role) {
		        	if (role.attributes.parent_id === val.val) {
		            	view = new RoleView({model: role,collection:coll,attributes:{"style":"margin-left:20px"}});
		            	var $el = val.viewel;
		        		$el.append(view.render().el);   
		        		th.recurs({val:role.attributes.id,model:role,viewel:view.$el,collection:coll}); 
		        	}
		        });	  

	        return this;
	    },
	 
	    render: function() {
	    	all_roles.forEach(function(model) {
	        	if (model.attributes.parent_id === "0" && model.attributes.id !== '1') {
	            	var role = new RoleView({model: model,collection:this.collection});
	            	this.$el.append(role.render().el);
	                this.recurs({val: model.attributes.id, model:model,viewel:role.$el,collection:this.collection});
	        	}
	        }, this);    	
	        return this;
	    },
	    
	});

  return RoleListView;

});