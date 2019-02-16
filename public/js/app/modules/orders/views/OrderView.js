define([
  'backbone',      
  'text!../templates/order-template.html'
], function(Backbone,OrderTemplate) {

	 var OrderView = Backbone.View.extend({
		   tagName:  "tr",
		   className: "table_index_tr_no_title_order",

		   template: _.template(OrderTemplate),

		   events: {
			   "mouseenter" : "hoverEnter",
			   "mouseleave" : "hoverLeave",
			   "click" : "goToView"
		   },

		   initialize: function() {
				 console.log('OrderView initialize');  	
		     this.model.bind('change', this.render, this);
		     this.model.bind('destroy', this.remove, this);
		     this.model.bind('all', this.render, this);
		   },

		   render: function() {
			   this.$el.html(this.template(this.model.toJSON()));
			   return this;
		   },
		   
		   hoverEnter: function() {
			   this.$el.addClass("hover_tr");
		   },

		   hoverLeave: function() {
			   this.$el.removeClass("hover_tr");
		   },
		   
		   goToView: function() {
			   window.location = "#/orders/view/"+this.model.id
		   }

		 });

  return OrderView;

});