define([

  // Libs
  'backbone-relational',
  '../models/Department',
  '../collections/DepartmentList',  

], function(BackboneRelational,Department,DepartmentList) {

	var Company = Backbone.RelationalModel.extend({
		  defaults: function() {
			    return {
			    	id: "",
			    	name: ""
			    };
			  },
			  
			  url: '/department/company/:id',
			  idAttribute: "id",
				
				validate: function( attrs ) {
			      if ( attrs.name.length == 0 ) {
			          return alert('Название компании не должно быть пустым!');
			      }

			  },

			  initialize: function() {
				    if (!this.get("name")) {
				      this.set({"name": this.defaults.name});
				    }
				    if (!this.get("id")) {
					      this.set({"id": this.defaults.id});
					    }			    
				  },
				  clear: function() {
						this.url = '/department/company/'+this.attributes.id;
					    this.destroy({wait: true,
					    error : function () {
					    	alert('Не может быть удалено!');
					    }
					    });
					  },			  
				  
					 relations: [
						     		{
						     			autoFetch: true,
						     			type: Backbone.HasMany,
						     			key: 'departments',
						     			relatedModel: Department,
						     			keySource: 'departments',
						     			includeInJSON: Backbone.Model.prototype.idAttribute,						     			
						     			collectionType: DepartmentList,
						     			reverseRelation: {
						     				key: 'company_id'
						     			}
						     		}
						     	]	  
	});	

  return Company;

})	