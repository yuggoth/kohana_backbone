define([

  // Libs
  'backbone', 
  '../views/UserView',
  
], function(Backbone,UserView) {

	var UserListView = Backbone.View.extend({
		el: $('.table_content'),
	 
	    initialize: function() {

	    },
	 
	    render: function() {
	        this.collection.each(function(model) {
	            var view = new UserView({model: model});
	            this.$el.append(view.render().el);
	        }, this);
	        
	        return this;
	    },
	 
	});

  return UserListView;

});