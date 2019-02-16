define([

  // Libs
  'backbone', 
  'text!../templates/regnum-item-history-template.html'    

], function(Backbone,Template) {

	 var RegnumHistoryView = Backbone.View.extend({
		   tagName:  "tbody",
		   template: _.template(Template),
		   events: {

		   },

		   initialize: function() {
		//     this.model.bind('change', this.render, this);
		//     this.model.bind('destroy', this.remove, this);
		   },

		   render: function() {
			 this.$el.html(this.template(this.model));	
	         return this;
		   },

		 });

  return RegnumHistoryView;

});