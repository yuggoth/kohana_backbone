define([

  // Libs
  'backbone-relational', 
  '../models/Role',
  '../collections/RoleList',  

], function(BackboneRelational,Role,RoleList) {

	var User = Backbone.RelationalModel.extend({
		  defaults: function() {
		    return {
		    	email: "",
		    	username: "",
		    	fio: "",
		        date: "",
		        password: "",
		        password_confirm: ""
		    };
		  },
		  
		  url: '/auth/user/:id',
		  idAttribute: "id",
			
			validate: function( attrs ) {
		      if (!attrs.username.length) {
		          return 'Логин не должен быть пустым!';
		      }
		      
		      if (!attrs.fio.length) {
		          return 'Фио не должно быть пустым!';
		      }
		      
		      if (!attrs.email.length) {
		          return 'E-mail не должен быть пустым!';
		      }
		      
		      if (!attrs.roles.length) {
		          return 'Пользователь не может быть без прав!';
		      }
		      
		      if (!attrs.id) {
		      
		      if ( attrs.password.length < 8 ) {
		          return 'Пароль не должен быть таким коротким!';
		      }
		      
		      if ( attrs.password !== attrs.password_confirm ) {
		          return 'Пароли не совпадают!';
		      }
		      }

		  },

		  initialize: function() {

			  },

		  clear: function() {
			this.url = '/department/model/'+this.attributes.id;
		    this.destroy({wait: true,
		    error : function () {
		    	alert('Не может быть удалено!');
		    }
		    });
		  },
		  
		/*	 relations: [
				     		{
				     			autoFetch: true,
				     			type: Backbone.HasMany,
				     			key: 'roles',
				     			relatedModel: Role,
				     			collectionType: RoleList,
				     			reverseRelation: {
				     				key: 'role_id',
				     			}
				     		}	
				     	]  */

		});

  return User;

})	