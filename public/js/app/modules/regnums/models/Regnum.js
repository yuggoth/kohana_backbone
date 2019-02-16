define([

  // Libs
  'backbone-relational',
  '../models/OrderCompany',
  '../models/RegnumPosition',
  '../collections/RegnumPositionList'
  
], function(BackboneRelational,OrderCompany,RegnumPosition,RegnumPositionList) {

	 var Regnum = Backbone.RelationalModel.extend({
		    defaults: function() {
		        return {
		          date: "",
		          department: "2",
		          face:"",
		          face_id: 0,		          
		          company: "1",
		          status: "0",
		        };
		      },
		      
		      initialize: function() {    	  
		    	  
		          if (!this.get("date")) {
			            this.set({"date": this.defaults.date});
			          }
		          
		          if (!this.get("department")) {
			            this.set({"department": this.defaults.department});
			          }
		          
		          if (!this.get("face")) {
			            this.set({"face": this.defaults.face});
			          }
		          
		          if (!this.get("face_id")) {
			            this.set({"face_id": this.defaults.face_id});
			          }		 
		          
		          if (!this.get("company")) {
			            this.set({"company": this.defaults.company});
			          }
		          
		          if (!this.get("status")) {
			            this.set({"status": this.defaults.status});
			          }

		        },
		        
		         validate: function(attrs) {
		        	    if ( attrs.company.length < 1 ) {
		        	    	return 'Вы не указали компанию';
		       	        }
		        	    if ( attrs.department.length < 1 ) {
		        	    	return 'Вы не указали подразделение';
		       	        }		        	    
		        	    if ( attrs.face_id == '0' && attrs.face.length < 1) {
		        	    	return 'Вы не указали ответственное лицо';
		       	        }		        	    
		        	 
		         },
		         
				 relations: [
					     		
					             
					     		{
					     			autoFetch: true,
					     			type: Backbone.HasMany,
					     			key: 'positions',
					     			relatedModel: RegnumPosition,
					     			keySource: 'positions',					     			
					     			collectionType: RegnumPositionList,
					     			reverseRelation: {
					     				key: 'regnum_id',
					     			}
					     		}

					     		
					     	],
		         
					     	
	 });

  return Regnum;

})	