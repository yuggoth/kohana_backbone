define([

  // Libs
  'backbone',
  'text!../templates/order-position-is-warranty.html'

], function(Backbone, Template) {

	 var OrderPositionWarrantyView = Backbone.View.extend({
		   tagName: "div",
		   className: "is_warranty_div",
		   template: _.template(Template),

		   events: {
			   "change input" : "changePositionWarranty"
		   },

		   initialize: function() {
				 console.log('OrderPositionWarrantyView initialize');  
		   },

		   render: function() {
		     this.$el.html(this.template({warranty_number:this.model.get("warranty_number"),warranty_date:this.model.get("warranty_date"), warranty_time: this.model.get("warranty_time")}));
		     this.$el.find(".datepicker").datepicker({dateFormat:'dd/mm/yy',changeMonth: true,changeYear: true});
		     return this;
		   },
		   
		   changePositionWarranty: function() {
			 	this.model.set({"warranty_number": this.$("input.position_warranty_number").val(),
			 					"warranty_time": this.$("input.position_warranty_time").val(),
			 					"warranty_date": this.$("input.position_warranty_date").val(),
			 					});
		   }

		 }); 

  return OrderPositionWarrantyView;

});