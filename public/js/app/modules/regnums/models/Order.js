define([    
  // Libs
 // 'backbone-relational',
  'backbone',  
  
], function(Backbone) {

	 var Order = Backbone.Model.extend({
		    defaults: function() {
		        return {
		          request_date: null,
		          request_number: null,
		          invoice_date:"",
		          invoice_number: "",
		          supplier: "0",
		          new_supplier:"",
		          status: "0",
		          buh_doc: null,
		          company: "1"
		        };
		      },
		      
		      initialize: function() {
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
		          if (!this.get("supplier")) {
			            this.set({"supplier": this.defaults.supplier});
			          }
		          if (!this.get("new_supplier")) {
			            this.set({"new_supplier": this.defaults.new_supplier});
			          }		          
		          if (!this.get("company")) {
			            this.set({"company": this.defaults.company});
			          }

		        },
		         
					     	
	 });

  return Order;

})	