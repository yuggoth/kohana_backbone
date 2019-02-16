define([

  // Libs
  'backbone',
  '../collections/RoleList',     
  '../views/RoleListView',  
  '../views/RoleListView1',   
  '../views/ErrorView',     
  '../views/SuccessView',     
  'text!../templates/user-template.html'
  
], function(Backbone,RoleList,RoleListView,RoleListView1,ErrorView,SuccessView, Template) {

	var UserView = Backbone.View.extend({
		tagName:  "tr",
		className: "table_index_tr_no_title",

	  template: _.template(Template),

	  events: {
	    "click .order_remove"  : "deleteDepartment",
	    "dblclick td"  : "editUser",
	    "click .save_user"      : "saveUser",
	    "click .del" : "deleteUser"
	  },

	  initialize: function() {
	//    this.model.bind('change', this.render, this);
	    this.model.bind('destroy', this.remove, this);
	  },

	  render: function() {
	    this.$el.html(this.template(this.model.toJSON()));
	    this.input = this.$('.edit');
	    //вид коллекции ролей без инпутов
		var view = new RoleListView1({collection:new RoleList(this.model.attributes.roles)});
	    this.$el.find("td:eq(4)").append(view.render().$el);
	    //вид коллекции ролей для редактирования (скрытый слой)
		var view = new RoleListView({collection:new RoleList(this.model.attributes.roles)});
	    this.$el.find("td:eq(4)").append(view.render().$el); 
	    if (this.model.attributes.roles === undefined) { 
			this.$el.addClass("blocked");
	    	this.$el.find("td:eq(4)").append('Заблокирован'); }
	  /*  $(".roles_user").find("p input").each(function(){
	    	if ($(this).is(':checked')) {
	    		console.log($(this).parent("p"));
	    		$(this).parent("p").children("p").show();
	    	}
	    }); */
	    return this;
	  },
	  
	  editUser: function() {	
		 $(".table_content").find("tr").not(this).removeClass("editing");
		 $(".table_content").find("tr").not(this).find("td:eq(4) .roles_user").hide();
		 $(".table_content").find("tr").not(this).find("td:eq(4) .roles_user_bez_input").show();
		 this.render();
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
	     model.attributes.roles = [];
		 this.$el.find(".roles_user").find("p input").each(function(){
			if ($(this).is(':checked')) {
				 model.attributes.roles.push($(this).val());
			}
		 });
		 this.render();
	     this.model.url = '/auth/model/'+this.model.attributes.id;
	     var error = this.model.validate(this.model.attributes);
         if (error) {
             var view = new ErrorView({model:error});
             $("html").append(view.render().$el);
             setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
     } else {
	     this.model.save({validate:true});
     }
			this.render();
	  },
	  
	  deleteUser: function() {
		  if(!confirm('Удалить?')) return;
		  this.model.url = '/auth/model/'+this.model.attributes.id;
		  this.model.destroy({success: function(model, response) {var view = new SuccessView({model:'Успешно удалено'});
  		$("html").append(view.render().$el);
		setTimeout(function() { view.$el.fadeOut('slow'); }, 2000);
		},
			error: function(model,response) { 
			var view = new ErrorView({model:'Не может быть удалено. Имеются записи в журнале. Заблокировано'});
            $("html").append(view.render().$el);
            setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
			}
		,wait:true
	  });

			console.log('win');
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

  return UserView;

});