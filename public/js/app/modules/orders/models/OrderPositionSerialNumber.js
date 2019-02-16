define([

  // Libs
  'backbone-relational'

], function(BackboneRelational) {

	 var OrderPositionSerialNumber = Backbone.RelationalModel.extend({		
		    defaults: function() {
		        return {
		          serial_number: null,
		          status: 0
		        };
		      },
		      
		    initialize: function() {
 		    	
		          if (!this.get("serial_number")) {
		          this.set({"serial_number": this.defaults.serial_number});
		          }   
		          if (!this.get("status")) {
			        this.set({"status": this.defaults.status});
			      } 
		    },
		    
	         validate: function(attrs) {
		        	if (attrs.serial_number === undefined || !attrs.serial_number.length) {
		        	    return 'Серийные номера должны быть заполнены';
		       	    }
		      }	
	 });

  return OrderPositionSerialNumber;

})	