define([

  // Libs
  'backbone', 
  '../views/RegnumHistoryItemView',
  'text!../templates/regnum-history-template.html' 

], function(Backbone,RegnumHistoryItemView,Template) {

	 var RegnumHistoryView = Backbone.View.extend({
		   el: "#regnum_history",
		   template: _.template(Template),		   
		   events: {

		   },

		   initialize: function() {
	//	     this.model.bind('change', this.render, this);
	//	     this.model.bind('destroy', this.remove, this);
		   },

		   render: function() {
			     this.$el.html(this.template);
			     var el = this.$el;
			     this.collection.forEach(function(model) {
			            var view = new RegnumHistoryItemView({model: model});			        		
			            el.find("table.table_content").append(view.render().el);
		        });
	  
	         return this;
		   },

		 });

  return RegnumHistoryView;

});