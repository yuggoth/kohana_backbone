define([

  // Libs
  'backbone',    
  './OrderPositionView',
  'text!../templates/order-position-list-template.html'    

], function(Backbone,OrderPositionView,Template) {

	 var OrderPositionListView = Backbone.View.extend({
		   id: "table_zakaz",
		   
			template: _.template(Template),			   
		   
		   events: {
		   },

		   initialize: function() {
		 //    this.model.bind('change', this.render, this);
		 //    this.model.bind('destroy', this.remove, this);
		   },

		   render: function() {
			   this.$el.html(this.template);
			   var el = this.$el;
			   this.collection.forEach(function(model){
				   var view = new OrderPositionView({model: model});
				  el.append(view.render().el);				   
			   });	   	 
		     return this;
		   },
		   

		 }); 		

  return OrderPositionListView;

});