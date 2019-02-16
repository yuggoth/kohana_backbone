define([

  // Libs
  'backbone-relational'

], function(BackboneRelational) {

	 var OrderBuhdoc = Backbone.RelationalModel.extend({	
		    defaults: function() {
		        return {
		          invoice: "",
		          sales_invoice: "",
		          number_platej_document:"",
		          date_platej_document: null,
		          date: null
		        };
		      },
		      
		      initialize: function() { 
		          if (!this.get("invoice")) {
			            this.set({"invoice": this.defaults.invoice});
			          }
		          if (!this.get("sales_invoice")) {
			            this.set({"sales_invoice": this.defaults.sales_invoice});
			          }
		          if (!this.get("number_platej_document")) {
			            this.set({"number_platej_document": this.defaults.number_platej_document});
			          }
		          if (!this.get("date_platej_document")) {
			            this.set({"date_platej_document": this.defaults.date_platej_document});
			          }
		          if (!this.get("date")) {
			            this.set({"date": this.defaults.date});
			          }
		        },
		        
		         validate: function(attrs) {
		        	    if ( attrs.invoice.length < 1 ) {
		        	    	return 'Не указана счет-фактура';
		       	        }
		        	    if ( attrs.sales_invoice.length < 1 ) {
		        	    	return 'Не указана расходная накладная';
		       	        }
		        	    if ( attrs.number_platej_document.length < 1 ) {
		        	    	return 'Не указан номер платежного документа';
		       	        }
		        	    
		        	    if ( attrs.date_platej_document.length < 1 ) {
		        	    	return 'Не указана дата платежного документа';
		       	        }	
		        	    if ( attrs.date.length < 1 ) {
		        	    	return 'Не указана дата';
		       	        }		        	    
		        	 
		         }
	 });

  return OrderBuhdoc;

})	