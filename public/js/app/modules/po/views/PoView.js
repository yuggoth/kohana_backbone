define([

  // Libs
  'backbone',
  'text!../templates/po-item-index-template.html'

], function(Backbone, Template) {

	var PoView = Backbone.View.extend({
		  tagName:  "tr",
			className: "table_index_tr_no_title",

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
		  }
		  
		});

  return PoView;

});