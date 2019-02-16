define([

  // Libs
  'backbone',    
  '../views/OrderPositionSerialNumberView',  
  'text!../templates/order-position-serial-number-list-template.html'

], function(Backbone,OrderPositionSerialNumberView,Template) {

	 var OrderPositionSerialNumberListView = Backbone.View.extend({
		    tagName:  "tr",

		   template: _.template(Template),

		   events: {
			   "click .add_for_uchet" : "addForUchet"			   
		   },

		   initialize: function() {

		   },

		   render: function() {
		     this.$el.html(this.template);	
			   var el = this.$el;		     
		     this.collection.forEach(function(model){
		    	 var view = new OrderPositionSerialNumberView({model:model});
		    	 el.find("td").append(view.render().el);
		     });
		     return this;
		   },

		 }); 		

  return OrderPositionSerialNumberListView;

});