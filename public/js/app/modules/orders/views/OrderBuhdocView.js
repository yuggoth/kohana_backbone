define([

  // Libs
  'backbone',
  'text!../templates/order-buhdoc-template.html'

], function(Backbone, Template) {

	 var OrderBuhdocView = Backbone.View.extend({
		   tagName: "div",
		   className: "",
		   template: _.template(Template),

		   events: {
			   "blur input" : "changeBuhdoc"
		   },

		   initialize: function() {
				 console.log('OrderBuhdocView initialize');  
		   },

		   render: function() {
			     this.$el.html(this.template(this.model.toJSON()));
			     this.$el.find(".datepicker").datepicker({dateFormat:'dd/mm/yy',changeMonth: true,changeYear: true});
		     return this;
		   },
		   
		   changeBuhdoc: function() {	
			   this.model.set({"date":this.$el.find("input.order_buhdoc_date").val(),"invoice":this.$el.find("input.order_buhdoc_invoice").val(),"sales_invoice":this.$el.find("input.order_buhdoc_sales_invoice").val(),"number_platej_document":this.$el.find("input.order_buhdoc_number_platej_document").val(),"date_platej_document":this.$el.find("input.order_buhdoc_date_platej_document").val()});
		   }

		 });	

  return OrderBuhdocView;

});