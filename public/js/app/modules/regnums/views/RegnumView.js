define([

  // Libs
  'backbone',

  'text!../templates/regnum-template.html'

], function(Backbone, RegnumTemplate) {

	 var RegnumView = Backbone.View.extend({
		   tagName:  "tr",
		   className: "table_index_tr_no_title",

		   template: _.template(RegnumTemplate),
			
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
				window.location = "#/regnum/view/"+this.model.id
			}

		 });

  return RegnumView;

});