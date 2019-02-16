define([

  // Libs
  'backbone',
  '../collections/RoleList',      
  '../views/RoleListView', 
  '../views/UserView',     
  '../views/ErrorView',   
  '../views/SuccessView',    
  'text!../templates/user-template1.html'
  
], function(Backbone,RoleList,RoleListView,UserView,ErrorView,SuccessView,Template) {

	var UserView1 = Backbone.View.extend({
		
		  template: _.template(Template),

		  events: {
			  "click #user_form_button" : "saveUser",
			  "blur input": "changeNewUser"
		  },

		  initialize: function() {
		 //   this.model.bind('change', this.render, this);
		    this.model.bind('destroy', this.remove, this);
		    this.model
	    	.on('invalid', function(model, error){
	    		var view = new ErrorView({model:error});
	    		$("html").append(view.render().$el);
	    		setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
	    		
	    	});
		  },

		  render: function() {
		    this.$el.html(this.template(this.model.toJSON())); 
			var view = new RoleListView({collection:new RoleList(this.model.attributes.roles)});
			this.$el.find("#roles").html(view.render().$el);
		    return this;
		  },
		  
		  saveUser: function() {
			  	var model = this.model;
			  	model.attributes.roles = [];
				 this.$el.find(".roles_user").find("p input").each(function(){
					if ($(this).is(':checked')) {
						 model.attributes.roles.push($(this).val());
					}
				 });
			     this.model.url = '/auth/model/'+this.model.attributes.id;
			     var error = this.model.validate(this.model.attributes);
		         if (error) {
		             var view = new ErrorView({model:error});
		             $("html").append(view.render().$el);
		             setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
		     } else {
		    	 
					this.model.save({validate:true,wait: true},
						    {success : function(model, response) {
					    		var view = new SuccessView({model:response});
					    		$("html").append(view.render().$el);
					    		setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
					    		window.users.fetch();
					    		model.clear();
								$("#add_user").slideDown('slow');
								$("#user_form").slideUp('slow');
					    		//	var view = new UserView({model: this.model});
					    		//    $("#users_table").append(view.render().el);
						    }},
						    {error : function () {
						    	var view = new ErrorView({model:error});
					            $("html").append(view.render().$el);
					            setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
						    }
						    });  	 
		     }
		  },
		  
		  changeNewUser: function() {
			  	var model = this.model;
			  	model.attributes.roles = [];
				 $("#roles").children(".roles_user").find("p input").each(function(){
					if ($(this).is(':checked')) {
						 model.attributes.roles.push($(this).val());
					}
				 });
			 	this.model.set({"fio": this.$("input:eq(0)").val(),"username": this.$("input:eq(1)").val(),"email": this.$("input:eq(2)").val(),"password": this.$("input:eq(3)").val(),"password_confirm": this.$("input:eq(4)").val()}); 
		  }

		});

  return UserView1;

});