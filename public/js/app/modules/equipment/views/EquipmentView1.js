define([

  // Libs
  'backbone',
  'text!../templates/equipment-view-template.html'

], function(Backbone, Template) {

	var EquipmentView = Backbone.View.extend({
		  tagName:  "div",

		  template: _.template(Template),

		  initialize: function() {
		    this.model.bind('change', this.render, this);
		    this.model.bind('destroy', this.remove, this);
		  },

		  render: function() {
		    this.$el.html(this.template(this.model.toJSON()));
		    return this;
		  },
		  
		});

  return EquipmentView;

});