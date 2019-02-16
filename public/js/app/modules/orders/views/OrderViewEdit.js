define([

  // Libs
  'jqueryUI',
  'backbone',
  '../views/OrderCompanyListView',
  '../views/OrderBuhdocView',  
  'text!../templates/order-edit-template.html'

], function(jqueryUI,Backbone, OrderCompanyListView, OrderBuhdocView, Template) {

	 var OrderViewEdit = Backbone.View.extend({
		   tagName:  "div",
		   className: "zakaz_form",

		   template: _.template(Template),

		   events: {
				"change select" : "changeCompany", 
				"change input:text" : "changeOrder"
		   },

		   initialize: function() {			   
		     this.model.bind('destroy', this.remove, this);
		   },

		   render: function() {
		     this.$el.html(this.template({model:this.model.toJSON()}));
		     var view = new OrderCompanyListView({model:this.model.get("company")});
		     this.$el.find("#company_collection").html(view.render().$el);
		     if (this.model.get("buhdoc")) {
		     var view = new OrderBuhdocView({model:this.model.get("buhdoc")});
		     $("#order_buhdoc_container").html(view.render().$el);
		     }
		     this.$el.find(".datepicker").datepicker({dateFormat:'dd/mm/yy',changeMonth: true,changeYear: true});		     
		     var el = this.$el;
	            this.$el.find("#supplier").autocomplete({
	          	    source: "/ajax/ajax?type=1",
	                minLength: 3,
	         	    select: function(event, ui) {
	         	    el.find("input[name=supplier]").val(ui.item.id);
	          	    }
	             });
		     return this;
		   },
		   
		   changeCompany: function() {
			 this.model.set({company:this.$el.find("select :selected").attr("id")});
		   },
		   
		   changeOrder: function() {
			   this.model.set({invoice_number: this.$el.find("input.order_invoice_number").val(),
				   invoice_date: this.$el.find("input.order_invoice_date").val(),
				   request_date: this.$el.find("input.order_request_date").val(),
				   request_number: this.$el.find("input.order_request_number").val(),
				   supplier: this.$el.find("input.order_supplier").val(),
				   new_supplier: this.$el.find("input.order_new_supplier").val()
				   });
		   }

		 });

  return OrderViewEdit;

});