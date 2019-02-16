define([

  // Libs
  'backbone',

  
], function(Backbone) {

	 var OrderForIndex = Backbone.Model.extend({
		    defaults: function() {
		        return {
		          request_date: "",
		          request_number: "",
		          invoice_date:"",
		          invoice_number: "",
		          supplier_id: "0",
		          status: "0",
		          buh_doc: null,
		          company: "1"
		        };
		      },
		      
		      initialize: function() {
					 console.log('OrderForIndex initialize');  
		          if (!this.get("request_date")) {
			            this.set({"request_date": this.defaults.request_date});
			          }
		          
		          if (!this.get("request_number")) {
			            this.set({"request_number": this.defaults.request_number});
			          }
		          if (!this.get("invoice_date")) {
			            this.set({"invoice_date": this.defaults.invoice_date});
			          }
		          if (!this.get("invoice_number")) {
			            this.set({"invoice_number": this.defaults.invoice_number});
			          }
		          if (!this.get("supplier_id")) {
			            this.set({"supplier_id": this.defaults.supplier_id});
			          }
		          if (!this.get("company")) {
			            this.set({"company": this.defaults.company});
			          }

		        }		         
					     	
	 });

  return OrderForIndex;

})	