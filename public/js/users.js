$(function () {
	
	//Модель роли

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

	//Коллекция ролей

	var RoleList = Backbone.Collection.extend({
		  model: Role,
		  url: '/auth/getallroles'
		});	

//Модель пользователя
var User = Backbone.RelationalModel.extend({
  defaults: function() {
    return {
    	id: "",
    	email: "",
    	username: "",
    	fio: "",
        date: ""
    };
  },
  
  url: '/auth/user/:id',
  idAttribute: "id",
	
	validate: function( attrs ) {
      if ( attrs.username.length == 0 ) {
          return alert('Имя пользования не должно быть пустым!');
      }

  },

  initialize: function() {

	    if (!this.get("id")) {
		      this.set({"id": this.defaults.id});
		    }
	    if (!this.get("email")) {
	      this.set({"email": this.defaults.email});
	    }
	    if (!this.get("username")) {
		      this.set({"username": this.defaults.username});
		    }
	    if (!this.get("fio")) {
		      this.set({"fio": this.defaults.fio});
		    }
	    if (!this.get("date")) {
		      this.set({"date": this.defaults.date});
		    }
	  },

  clear: function() {
	this.url = '/department/model/'+this.attributes.id;
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
		     			key: 'roles',
		     			relatedModel: Role,
		     			collectionType: RoleList,
		     	//		includeInJSON: Backbone.Model.prototype.idAttribute,	
		     			reverseRelation: {
		     				key: 'role_id',
		     			}
		     		}	
		     	]  

});

// Коллекция пользователей

var UserList = Backbone.Collection.extend({
	  model: User,
	  url: '/auth/getallusers'
	});

//Вид роли с инпутом

var RoleView = Backbone.View.extend({
	
	tagName: 'p',
	
	className: '',
	
	template: _.template($('#role-template').html()),

	  events: {
			"click input"  : "showChildrenInput",
		  },

	initialize: function() {
	     this.model.bind('change', this.render, this);
	     this.model.bind('destroy', this.remove, this);	
	     this.model.bind('all', this.render, this);
	},

	render: function() {
	     this.$el.html(this.template(this.model.toJSON()));
	     var id = this.model.attributes.id;
	     var element = this.$el;
    	 var i = 0;
	     this.collection.forEach(function(model){
	    	 if (model.attributes.id === id) {
	    		 element.children("input").attr({"checked":"checked"});
		    	 i++;
	    	 } 
	     });

	     if (i === 0 && this.model.attributes.parent_id !== "0" && !this.collection.findWhere({id: roles.findWhere({id: this.model.attributes.parent_id}).attributes.id})) { element.hide();}
	     this.input = this.$('input');
	     return this;   
	},	
	   
    showChildrenInput: function() {
    	
    	var val = this.input.val(); 
    	if (val && val !== "2" && this.input.is(':checked')) {
    		this.input.parent('p').children('p').show();
    	} else {
    		this.input.parent('p').find("p input").attr("checked", false);    		
    		this.input.parent('p').find("p").hide();
    	}
    	if (val === "2") {
    		if (this.input.is(':checked')) {
        	$("#roles").find("p input").not(this.input).attr("checked", false);
        	$("#roles").find("p p").hide();
    		$("#roles").find("p input").not(this.input).attr("disabled", "disabled");
    		} else {
    		$("#roles").find("p input").removeAttr("disabled");
    		}
    	}
    },    
 
    
    close: function() {
        var value = this.$el.find(".edit_company").val();
        this.model.url = '/department/company/'+this.model.attributes.id;
        this.model.save({name:value},{validate : true});
        this.$el.removeClass("editing");
    }, 
	
	deleteCompany: function() {
			if(!confirm('Удалить?')) return;
		   this.model.clear();
	}
	
});

//Вид роли без инпута

var RoleView1 = Backbone.View.extend({
	
	tagName: 'p',
	
	className: '',
	
	template: _.template($('#role-template1').html()),

	initialize: function() {
	     this.model.bind('change', this.render, this);
	     this.model.bind('all', this.render, this);
	},

	render: function() {
	     this.$el.html(this.template(this.model.toJSON()));
	     this.input = this.$('input');
	     return this;   
	}
	
});

//Вид пользователя

var UserView = Backbone.View.extend({
	tagName:  "tr",
	className: "table_index_tr_no_title",

  template: _.template($('#user-template').html()),

  events: {
    "click .order_remove"  : "deleteDepartment",
    "dblclick td"  : "editUser",
    "click .save_user"      : "saveUser"
  },

  initialize: function() {
    this.model.bind('change', this.render, this);
    this.model.bind('destroy', this.remove, this);
  },

  render: function() {
	  console.log(this.model.get("roles"));
    this.$el.html(this.template(this.model.toJSON()));
    this.input = this.$('.edit');
	var view = new RoleListView1({collection:this.model.get("roles")});
    this.$el.find("td:eq(4)").append(view.render().$el);
	var view = new RoleListView({collection:this.model.get("roles")});
    this.$el.find("td:eq(4)").append(view.render().$el); 
  /*  $(".roles_user").find("p input").each(function(){
    	if ($(this).is(':checked')) {
    		console.log($(this).parent("p"));
    		$(this).parent("p").children("p").show();
    	}
    }); */
    return this;
  },
  
  editUser: function() {	
	 this.$el.addClass("editing");
	 this.$el.find("td:eq(0) .edit").focus();	  
	 this.$el.find("td:eq(4) .roles_user").show();
	 this.$el.find("td:eq(4) .roles_user_bez_input").hide();  
    },

  deleteUserParam: function() {
	 if(!confirm('Удалить?')) return;
     this.model.clear();
  },
  
  saveUser: function() {
	  var model = this.model;
	 this.model.set({fio:this.$el.find(".edit_fio").val(),username:this.$el.find(".edit_username").val(),email:this.$el.find(".edit_email").val()});
     this.$el.removeClass("editing");
	 this.model.get("roles").reset();
	 this.$el.find(".roles_user").find("p input").each(function(){
		if ($(this).is(':checked')) {
			model.get("roles").add($(this).val());
		}
	 });
	 this.render();
     this.model.url = '/auth/model/'+this.model.attributes.id;
     this.model.save();
  },
  
  closeFio: function() {

      this.model.save({fio:value},{validate : true});
      this.$el.find(".edit_fio").parent("td").removeClass("editing");
    }, 
    
   closeUsername: function() {
      this.model.url = '/auth/users/model/'+this.model.attributes.id;
      this.model.save({username:value},{validate : true});
      this.$el.find(".edit_username").parent("td").removeClass("editing");
    }, 
      
   closeEmail: function() {
      this.model.url = '/auth/users/model/'+this.model.attributes.id;
      this.model.save({email:value},{validate : true});
      this.$el.find(".edit_email").parent("td").removeClass("editing");
    },       
    
  updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

});

//Вид нового пользователя

var UserView1 = Backbone.View.extend({
	
  template: _.template($('#user-template1').html()),

  events: {
	  "click #user_form_button" : "saveUser",
	  "blur input": "changeNewUser"
  },

  initialize: function() {
    this.model.bind('change', this.render, this);
    this.model.bind('destroy', this.remove, this);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON())); 
	var view = new RoleListView({collection:new RoleList});
    $("#roles").append(view.render().$el);
    return this;
  },
  
  saveUser: function() {
	  console.log(this.model);
  },
  
  changeNewUser: function() {
	 	this.model.set({"fio": this.$("input:eq(0)").val(),"username": this.$("input:eq(1)").val(),"email": this.$("input:eq(2)").val(),"password": this.$("input:eq(3)").val()}); 
  }

});

//Вид коллекции poлей с инпутами
var RoleListView = Backbone.View.extend({
	
	className: "roles_user",
	events: {
	},
 
    initialize: function() {
    },
    
    recurs: function(val,model,viewel) {
    	var view = '';
    	var th = this;
    	var coll = this.collection;
        roles.each(function(role) {
        	if (role.attributes.parent_id === val.val) {
            	view = new RoleView({model: role,collection:coll,attributes:{"style":"margin-left:20px"}});
            	var $el = val.viewel;
        		$el.append(view.render().el);   
        		th.recurs({val:role.attributes.id,model:role,viewel:view.$el,collection:coll}); 
        	}
        });
        return this;
    },
 
    render: function() {
       	roles.forEach(function(model) {
        	if (model.attributes.parent_id === "0") {
            	var role = new RoleView({model: model,collection:this.collection});
            	this.$el.append(role.render().el);
                this.recurs({val: model.attributes.id, model:model,viewel:role.$el,collection:this.collection});
        	}
        }, this);
        return this;
    },
    
});

//Вид коллекции poлей без инпутов
var RoleListView1 = Backbone.View.extend({
	
	className: "roles_user_bez_input",
	
	events: {

	},
 
    initialize: function() {
    },
    
    recurs: function(val,model,viewel) {
    	var view = '';
    	var th = this;
    	this.collection.each(function(role) {
        	if (role.attributes.parent_id === val.val) {
            	view = new RoleView1({model: role,attributes:{"style":"margin-left:20px"}});
            	var $el = val.viewel;
        		$el.append(view.render().el);   
        		th.recurs({val:role.attributes.id,model:role,viewel:view.$el}); 
        	}
        });
        return this;
    },
 
    render: function() {
       	this.collection.forEach(function(model) {
        	if (model.attributes.parent_id === "0") {
            	var role = new RoleView1({model: model});
            	this.$el.append(role.render().el);
                this.recurs({val: model.attributes.id, model:model,viewel:role.$el});
        	}
        }, this);
        return this;
    }
    
});

// Вид коллекции пользователей
var UserListView = Backbone.View.extend({
	el: $('.table_content'),
 
    initialize: function() {

    },
 
    render: function() {
        this.collection.each(function(model) {
            var view = new UserView({model: model});
            this.$el.append(view.render().el);
        }, this);
        
        return this;
    },
 
});

var users = new UserList();

var roles = new RoleList();

// Вид приложения

var AppView = Backbone.View.extend({

el: $("#content"),

events: {
    "click #add_user":  "showUserForm",
    "click #close_user_form": "hideUserForm",
    "click #user_form_button": "addnewUser",
},

initialize: function() {
	roles.reset(roles_data);
	users.bind('add', this.addOneUser, this);
	users.reset(users_data);
	var viewUsers = new UserListView({collection:users});
	viewUsers.render();

    var newUser = new User;
    var view = new UserView1({model:newUser});
    $("#user_form").html(view.render().$el);
},

render: function() {
},

addOneUser: function(todo) {
    var view = new UserView({model: todo});
    $(".table_content").append(view.render().el);
  },

addNewUser: function() {
	},  	

showUserForm: function() {
	$("#user_form").slideDown('slow');
	$("#add_user").slideUp('slow');
  },
  
hideUserForm: function() {
	$("#add_user").slideDown('slow');
	$("#user_form").slideUp('slow');
	},  

});

//запускаем приложение
var App = new AppView();	

Backbone.history.start();  // Запускаем HTML5 History push    


});