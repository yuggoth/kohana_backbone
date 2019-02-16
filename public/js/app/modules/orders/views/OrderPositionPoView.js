define([

  // Libs
  'backbone',
  'text!../templates/order-position-is-po.html'

], function(Backbone, Template) {

	 var OrderPositionPoView = Backbone.View.extend({
		   tagName: "div",
		   className: "is_po_div",
		   template: _.template(Template),

		   events: {
			   "change input" : "changePositionPo"
		   },

		   initialize: function() {
			   console.log('OrderPositionPoView initialize');  
		   },

		   render: function() {
		     this.$el.html(this.template({count_licenses:this.model.get("count_licenses"),sublicensing_contract:this.model.get("sublicensing_contract"), unique_license_number: this.model.get("unique_license_number")}));
		     return this;
		   },
		   
		   changePositionPo: function() {

			 	this.model.set({"count_licenses": this.$("input.position_count_licenses").val(),
			 					"sublicensing_contract": this.$("input.position_sublicensing_contract").val(),
			 					"unique_license_number": this.$("input.position_unique_license_number").val()
			 					}); 
		   }

		 });

  return OrderPositionPoView;

});