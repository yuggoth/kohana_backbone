define([

  // Libs
  'backbone', 
  'text!../templates/history-item-template.html'    

], function(Backbone,Template) {

	 var EquipmentHistoryItemView = Backbone.View.extend({
		   tagName:  "tr",
		   template: _.template(Template),
		   events: {

		   },

		   initialize: function() {
		     this.model.bind('change', this.render, this);
		     this.model.bind('destroy', this.remove, this);
		   },

		   render: function() {
			 this.$el.html(this.template(this.model.toJSON()));	
	         return this;
		   },

		 });

  return EquipmentHistoryItemView;

});