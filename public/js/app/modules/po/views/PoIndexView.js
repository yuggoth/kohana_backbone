define([

  // Libs
  'backbone',
  '../collections/PoList',  
  '../views/PoView',    
  'text!../templates/po-index-template.html'      
  
], function(Backbone,PoList,PoView,Template) {

	var PoIndexView = Backbone.View.extend({
		
		el: $("#content"),

		template: _.template(Template),				
		
		initialize: function() {
			this.render();
			var Po = new PoList();
			Po.bind('add', this.addOne, this);
			Po.fetch();
		},
		
		render: function() {
		     this.$el.html(this.template);
		},	
		
		addOne: function(model) {
		    var view = new PoView({model: model});
		    $("#po_table").append(view.render().el);
		  },		
		
		});

  return PoIndexView;

});