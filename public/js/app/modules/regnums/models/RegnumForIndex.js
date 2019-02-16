define([

  // Libs
  'backbone',

  
], function(Backbone) {

	 var RegnumForIndex = Backbone.Model.extend({
		    defaults: function() {
		        return {
		          date: "",
		          company: "",
		          department:"",
		          face: ""
		        };
		      },
		      
		      initialize: function() {

		          if (!this.get("date")) {
			            this.set({"date": this.defaults.date});
			          }
		          
		          if (!this.get("company")) {
			            this.set({"company": this.defaults.company});
			          }
		          if (!this.get("department")) {
			            this.set({"department": this.defaults.department});
			          }
		          if (!this.get("face")) {
			            this.set({"face": this.defaults.face});
			          }
		        }		         
					     	
	 });

  return RegnumForIndex;

})	