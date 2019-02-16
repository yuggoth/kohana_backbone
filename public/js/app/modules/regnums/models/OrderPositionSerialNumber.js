define([

  // Libs
  'backbone-relational'

], function(BackboneRelational) {

	 var OrderPositionSerialNumber = Backbone.RelationalModel.extend({	
		 defaults: function() {
		        return {
		        	changed: false,		       
		 }
		 },       
		 initialize: function() {
			          if (!this.get("changed")) {
			            this.set({"changed": this.defaults.changed});
	     }
			          
		 },
	        changed: function() {
	            this.attributes.changed = true;
	          },	 
		      
	 });		          

  return OrderPositionSerialNumber;

})	