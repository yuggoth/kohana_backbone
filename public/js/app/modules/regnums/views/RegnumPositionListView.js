define([

  // Libs
  'backbone',    
  './RegnumPositionView'

], function(Backbone,RegnumPositionView) {

	 var RegnumPositionListView = Backbone.View.extend({
		 	tagName: "table",
		 	className: "table_zakaz table_content",

		   events: {
		   },

		   initialize: function() {
		 //    this.model.bind('change', this.render, this);
		 //    this.model.bind('destroy', this.remove, this);
		   },

		   render: function() {
			   var el = this.$el;
			   this.collection.forEach(function(model){
				   var view = new RegnumPositionView({model: model});
				  el.append(view.render().el);				   
			   });	   	 
		     return this;
		   },
		   

		 }); 		

  return RegnumPositionListView;

});