define([

  // Libs
  'backbone-relational' 

], function(BackboneRelational) {

	var Role = Backbone.RelationalModel.extend({
		  defaults: function() {
			    return {
			    	id: "",
			    	name: "",
			    	description: ""
			    };
			  },
			  
			  url: '/auth/role/:id',
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
				    if (!this.get("description")) {
					      this.set({"description": this.defaults.description});
					    }	
				  },
				  clear: function() {
						this.url = '/department/company/'+this.attributes.id;
					    this.destroy({wait: true,
					    error : function () {
					    	alert('Не может быть удалено!');
					    }
					    });
					  }  
	});

  return Role;

})	