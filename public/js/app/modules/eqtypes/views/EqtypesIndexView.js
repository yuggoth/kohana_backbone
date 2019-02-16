define([

  // Libs
  'backbone',  
  '../collections/TypeList',
  '../views/TypeView',
  'text!../templates/eqtypes-index-view-template.html'

], function(Backbone,TypeList,TypeView, Template) {

	var EqtypesIndexView = Backbone.View.extend({

		el: $("#content"),
		
		template: _.template(Template),		

		events: {
		    "keypress #eq_type":  "createOnEnter",
		},

		initialize: function() {
			this.render();
			this.Types = new TypeList();
			this.input = this.$("#eq_type");
			this.Types.bind('add', this.addOne, this);
		//	this.Types.bind('all', this.render, this);
			this.Types.fetch();
		},

		render: function() {
		     this.$el.html(this.template);
		},

		addOne: function(todo) {
		    var view = new TypeView({model: todo});
		    $("#eqtypes_table").append(view.render().el);
		  },

		createOnEnter: function(e) {
		    if (e.keyCode != 13) return;
		    if (!this.input.val()) return;

		    this.Types.create({name: this.input.val()});
		    this.input.val('');
		  },

		});

  return EqtypesIndexView;

});