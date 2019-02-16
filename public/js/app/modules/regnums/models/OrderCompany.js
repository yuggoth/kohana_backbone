define([

  // Libs
  'backbone-relational',
  '../models/RegnumDepartment',
  '../collections/RegnumDepartmentList'

], function(BackboneRelational,RegnumDepartment,RegnumDepartmentList) {

	 var OrderCompany = Backbone.RelationalModel.extend({
       	 relations: [		 
     	 {
  			type: Backbone.HasMany,
  			key: 'departments',
  			relatedModel: RegnumDepartment,
 			keySource: 'departments',			     			
 			collectionType: RegnumDepartmentList,  			
  			reverseRelation: {
  				key: 'company_id',	
  			}
  	 }
     ]
	 });	

  return OrderCompany;

})	