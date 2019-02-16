define([

  // Libs
  'backbone-relational'

], function(BackboneRelational) {

	 var OrderPositionWarranty = Backbone.RelationalModel.extend({	
		 
		    defaults: function() {
		        return {
		        };
		      },
		      
		 initialize: function() {
		    			    	
		          if (!this.get("warranty_number")) {
		            this.set({"warranty_number": this.defaults.warranty_number});
		          }   
		          if (!this.get("warranty_date")) {
			        this.set({"warranty_date": this.defaults.warranty_date});
			      } 
		          if (!this.get("warranty_time")) {
			        this.set({"warranty_time": this.defaults.warranty_time});
			      } 
		 },
		 
         validate: function(attrs) {

	        	if (attrs.warranty_number === undefined || !attrs.warranty_number.length) {
	        	    return 'Номер гарантии не должен быть пустым';
	       	    }
	        	if (attrs.warranty_date === undefined || !attrs.warranty_date.length) {
	        	    return 'Не заполнена дата гарантии';
	       	    }		        	
	        	if (attrs.warranty_time === undefined || !attrs.warranty_time.length) {
  	    	return 'Не указан срок гарантии';
 	        }	    
	      }		  
	 });

  return OrderPositionWarranty;

})	