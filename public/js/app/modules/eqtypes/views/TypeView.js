define([

  // Libs
  'backbone',
  'text!../templates/eqtypes-type-template.html'

], function(Backbone, Template) {

	var TypeView = Backbone.View.extend({
		  tagName:  "tr",
			className: "table_index_tr_no_title",

		  template: _.template(Template),

		  events: {
		    "click .order_remove"  : "deleteType",
		    "dblclick td"  : "edit",
		    "keypress .edit"  : "updateOnEnter",
		    "blur .edit"      : "close"
		  },

		  initialize: function() {
		    this.model.bind('change', this.render, this);
		    this.model.bind('destroy', this.remove, this);
		  },

		  render: function() {
		    this.$el.html(this.template(this.model.toJSON()));
		    this.input = this.$('.edit');
		    return this;
		  },
		  
		  edit: function() {
		      this.$el.addClass("editing");
		      this.input.focus();
		    },

		  deleteType: function() {
			if(!confirm('Удалить?')) return;
		   this.model.clear();
		  },
		  
		  close: function() {
		      var value = this.input.val();
		      this.model.url = '/eqtypes/model/'+this.model.attributes.id;
		      this.model.save({name:value},{validate : true});
		      this.$el.removeClass("editing");
		    }, 
		    
		  updateOnEnter: function(e) {
		      if (e.keyCode == 13) this.close();
		    },

		});

  return TypeView;

});