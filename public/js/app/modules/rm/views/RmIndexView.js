define([

  // Libs
  'backbone',
  'text!../templates/rm-index-template.html'      
  
], function(Backbone,Template) {

	var RmIndexView = Backbone.View.extend({
		
		el: $("#content"),

		template: _.template(Template),				
		
		initialize: function() {
			this.render();
		},
		
		render: function() {
		     this.$el.html(this.template);
		},	

		});

  return RmIndexView;

});