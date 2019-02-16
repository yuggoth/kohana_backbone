define([

  // Libs
  'backbone',
  'text!../templates/equipment-item-index-template.html'

], function(Backbone, Template) {

	var EquipmentView = Backbone.View.extend({
		  tagName:  "tr",
			className: "table_index_tr_no_title",

		  template: _.template(Template),

		   events: {
			   "mouseenter" : "hoverEnter",
			   "mouseleave" : "hoverLeave",
			   "click" : "goToView"
		   },

		  initialize: function() {
		    this.model.bind('change', this.render, this);
		    this.model.bind('destroy', this.remove, this);
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
			   window.location = "#/equipment/view/"+this.model.id;
		   }
		  
		});

  return EquipmentView;

});