define([

  // Libs
  'backbone', 
  '../views/RoleView1',
  '../collections/RoleList',  
  
], function(Backbone,RoleView1,RoleList) {

	var RoleListView1 = Backbone.View.extend({
		
		className: "roles_user_bez_input",
		
		events: {

		},
	 
	    initialize: function() {

	    },
	    
	    recurs: function(val,model,viewel) {
	    	var view = '';
	    	var th = this;
	    	this.collection.each(function(role) {
	        	if (role.attributes.parent_id === val.val) {
	            	view = new RoleView1({model: role,attributes:{"style":"margin-left:20px"}});
	            	var $el = val.viewel;
	        		$el.append(view.render().el);   
	        		th.recurs({val:role.attributes.id,model:role,viewel:view.$el}); 
	        	}
	        });
	        return this;
	    },
	 
	    render: function() {
	       	this.collection.forEach(function(model) {
	        	if (model.attributes.parent_id === "0") {
	            	var role = new RoleView1({model: model});
	            	this.$el.append(role.render().el);
	                this.recurs({val: model.attributes.id, model:model,viewel:role.$el});
	        	}
	        }, this);
	        return this;
	    }
	    
	});

  return RoleListView1;

});