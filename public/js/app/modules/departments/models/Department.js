define([

  // Libs
  'backbone-relational'

], function(BackboneRelational) {

	var Department = Backbone.RelationalModel.extend({
		  defaults: function() {
		    return {
		    	id: "",
		    	name: "",
		    	company_id: ""
		    };
		  },
		  
		  url: '/department/model/:id',
		  idAttribute: "id",
			
			validate: function( attrs ) {
		      if ( attrs.name.length == 0 ) {
		          return alert('Название типа оборудования не должно быть пустым!');
		      }

		  },

		  initialize: function() {
			    if (!this.get("name")) {
			      this.set({"name": this.defaults.name});
			    }
			    if (!this.get("id")) {
				      this.set({"id": this.defaults.id});
				    }
			    if (!this.get("company_id")) {
				      this.set({"company_id": this.defaults.company_id});
				    }
			  },

		  clear: function() {
			this.url = '/department/model/'+this.attributes.id;
		    this.destroy({wait: true,
		    error : function () {
		    	alert('Не может быть удалено!');
		    }
		    });
		  }

		});

  return Department;

})	