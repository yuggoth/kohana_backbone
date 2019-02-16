define([

  // Libs
  'backbone',
  
  'text!../templates/department-department-template.html'

], function(Backbone,Template) {

	var DepartmentView = Backbone.View.extend({
		tagName:  "tr",
		className: "table_index_tr_no_title",

	  template: _.template(Template),

	  events: {
	    "click .order_remove"  : "deleteDepartment",
	    "dblclick td"  : "editDepartment",
	    "keypress .edit_department"  : "updateOnEnter",
	    "blur .edit_department"      : "close"
	  },

	  initialize: function() {
	    this.model.bind('change', this.render, this);
	    this.model.bind('destroy', this.remove, this);
	  },

	  render: function() {
	    this.$el.html(this.template(this.model.toJSON()));
	 //   this.input = this.$('.edit');
	    return this;
	  },
	  
	  editDepartment: function() {
	      this.$el.addClass("editing");
	      this.$el.find(".edit_department").focus();
	    },

	  deleteDepartment: function() {
		if(!confirm('Удалить?')) return;
	   this.model.clear();
	  },
	  
	  close: function() {
	      var value = this.$el.find(".edit_department").val();
	      this.model.url = '/department/model/'+this.model.attributes.id;
	      this.model.save({name:value},{validate : true});
	      this.$el.removeClass("editing");
	    }, 
	    
	  updateOnEnter: function(e) {
	      if (e.keyCode == 13) this.close();
	    },

	});

  return DepartmentView;

});