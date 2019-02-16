define([

  // Libs
  'backbone', 
  '../collections/UserList',
  '../collections/RoleList',
  '../views/UserListView',
  '../views/UserView',
  '../views/UserView1',
  '../views/RoleListView',
  '../models/User',  
  'text!../templates/users-index-view-template.html'
  
], function(Backbone,UserList,RoleList,UserListView,UserView,UserView1,RoleListView,User,Template) {

	var UserIndexView = Backbone.View.extend({
		
		el: $("#content"),
		
		template: _.template(Template),	
		
		events: {
		    "click #add_user":  "showUserForm",
		    "click #close_user_form": "hideUserForm",
		    "click #user_form_button": "addnewUser",
		},
		
		initialize: function() {
			this.render();			
			window.users = new UserList();
			window.roles = new RoleList();
			window.roles.reset(roles_data);
			window.users.bind('add', this.addOneUser, this);
			window.users.fetch();
			var viewUsers = new UserListView({collection:window.users});
			viewUsers.render();

		    var newUser = new User;
		    var view = new UserView1({model:newUser});
		    $("#user_form").html(view.render().$el);
		},

		render: function() {
		     this.$el.html(this.template);			
		},

		addOneUser: function(todo) {
		    var view = new UserView({model: todo});
		    $("#users_table").append(view.render().el);
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

  return UserIndexView;

});