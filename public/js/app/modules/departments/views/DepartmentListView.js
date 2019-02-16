define([

  // Libs
  'backbone',
  '../views/DepartmentView',   
  'text!../templates/department-collection-template.html'

], function(Backbone, DepartmentView, Template) {

	var DepartmentListView = Backbone.View.extend({
		
		tagName: 'table',
		
		className: 'table_content',
		
		template: _.template(Template),
		
	    events: { "keypress .department" : "addNewDepartment" },
		
	    initialize: function() {

	    },
	    
	    render: function() {
	        this.$el.html(this.template());    
	        this.collection.each(function(model) {
	            var view = new DepartmentView({model: model});
	            this.$el.append(view.render().el);
	        }, this);
	        return this;
	    },
		addNewDepartment:function(e) {
		    if (e.keyCode != 13) return;
		    if (!this.$el.find(".department").val()) return;
		    this.collection.create({company: this.collection.company_id.attributes.id,name: this.$el.find(".department").val(),company_id:this.collection.company_id},{wait: true});
		    this.$el.find(".department").val(''); 
		}
	 
	});

  return DepartmentListView;

});