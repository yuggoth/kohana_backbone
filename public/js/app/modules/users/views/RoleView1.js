define([

  // Libs
  'backbone',
  'text!../templates/role-template1.html'
  
], function(Backbone,Template) {

	var RoleView1 = Backbone.View.extend({
		
		tagName: 'p',
		
		className: '',
		
		template: _.template(Template),

		initialize: function() {
		     this.model.bind('change', this.render, this);
		     this.model.bind('all', this.render, this);
		},

		render: function() {
		     this.$el.html(this.template(this.model.toJSON()));
		     this.input = this.$('input');
		     return this;   
		}
		
	});

  return RoleView1;

});