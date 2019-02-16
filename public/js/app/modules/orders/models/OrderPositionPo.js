define([

  // Libs
  'backbone-relational'

], function(BackboneRelational) {

	 var OrderPositionPo = Backbone.RelationalModel.extend({
		 
		    defaults: function() {
		        return {
		          count_licenses: 1
		        }; 
		      },
		      
		    initialize: function() {
		    		    	
		          if (!this.get("count_licenses")) {
		            this.set({"count_licenses": this.defaults.count_licenses});
		          }   
		          if (!this.get("sublicensing_contract")) {
			        this.set({"sublicensing_contract": this.defaults.sublicensing_contract});
			      } 
		          if (!this.get("unique_license_number")) {
			        this.set({"unique_license_number": this.defaults.unique_license_number});
			      }    
		    },
		    
	         validate: function(attrs) {
		        	if (attrs.count_licenses.length < 1) {
		        	    return 'Число лицензий должно быть больше 0';
		       	    }
		        	if (attrs.sublicensing_contract === undefined || !attrs.sublicensing_contract.length) {
		        	    return '№ сублицензионного договора не должен быть пустым';
		       	    }		        	
		        	if (attrs.unique_license_number === undefined || !attrs.unique_license_number.length) {
	     	    	return 'уникальный № лицензии не должен быть пустым';
	    	        }	    
		      }	
		      
		      
	 });

  return OrderPositionPo;

})	