define([

  // Libs
  'backbone-relational' 

], function(BackboneRelational) {

	var Type = Backbone.Model.extend({
		  defaults: function() {
		    return {
		    	id: "",
		    	name: ""
		    };
		  },
		  
		  url: '/eqtypes/model/:id',
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
			  },

		  clear: function() {
			this.url = '/eqtypes/model/'+this.attributes.id;
		    this.destroy({wait: true,
		    success : function(model, response) {
		    	alert('Успешно удалено');
		    },
		    error : function () {
		    	alert('Не может быть удалено!');
		    }
		    });
		  }

		});

  return Type;

})	