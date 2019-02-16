$(function () {

//Модель подразделения
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

// Коллекция подразделений

var DepartmentList = Backbone.Collection.extend({
	  model: Department,
	  url: '/department/collection'
	});


//Модель компании

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

//Коллекция компаний

var CompanyList = Backbone.Collection.extend({
	  model: Company,
	  url: '/department/companies'
	});

//Вид компании

var CompanyView = Backbone.View.extend({
	
	tagName: 'div',
	
	className: 'company_name',
	
	template: _.template($('#company-template').html()),

	  events: {
		  	"click .company_remove"  : "deleteCompany",
		    "dblclick .company_name_in"  : "edit",
		    "keypress .edit_company"  : "updateOnEnter",
		    "blur .edit_company"      : "close"
		  },

	initialize: function() {
	     this.model.bind('change', this.render, this);
	     this.model.bind('destroy', this.remove, this);	
	     this.model.bind('all', this.render, this);
	},

	render: function() {
	     this.$el.html(this.template(this.model.toJSON()));
	     var view = new DepartmentListView({collection:this.model.get("departments")});
	     this.$el.append(view.render().$el);
	     return this;   
	},	
	   
    edit: function() {
        this.$el.addClass("editing");
        this.$el.find(".edit_company").focus();
    },
      
    updateOnEnter: function(e) {
          if (e.keyCode == 13) this.close();
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

//Вид подразделения

var DepartmentView = CompanyView.extend({
	tagName:  "tr",
	className: "table_index_tr_no_title",

  template: _.template($('#department-template').html()),

  events: {
    "click .order_remove"  : "deleteDepartment",
    "dblclick td"  : "editDepartment",
    "keypress .edit_department"  : "updateOnEnter",
    "blur .edit_department"      : "close"
  },

  initialize: function() {
    this.model.bind('change', this.render, this);
    this.model.bind('destroy', this.remove, this);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
 //   this.input = this.$('.edit');
    return this;
  },
  
  editDepartment: function() {
      this.$el.addClass("editing");
      this.$el.find(".edit_department").focus();
    },

  deleteDepartment: function() {
	if(!confirm('Удалить?')) return;
   this.model.clear();
  },
  
  close: function() {
      var value = this.$el.find(".edit_department").val();
      this.model.url = '/department/model/'+this.model.attributes.id;
      this.model.save({name:value},{validate : true});
      this.$el.removeClass("editing");
    }, 
    
  updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

});

// Вид коллекции компаний
var CompanyListView = Backbone.View.extend({
	el: $('.company_container'),
 
    initialize: function() {

    },
 
    render: function() {
        this.collection.each(function(model) {
            var view = new CompanyView({model: model});
            this.$el.append(view.render().el);
        }, this);
        return this;
    },
 
});

//Вид коллекции подразделений
var DepartmentListView = Backbone.View.extend({
	
	tagName: 'table',
	
	className: 'table_content',
	
	template: _.template($('#department-collection-template').html()),
	
    events: { "keypress .department" : "addNewDepartment" },
	
    initialize: function() {

    },
    
    render: function() {
        this.$el.html(this.template());    
        this.collection.each(function(model) {
            var view = new DepartmentView({model: model});
            this.$el.append(view.render().el);
        }, this);
        return this;
    },
	addNewDepartment:function(e) {
	    if (e.keyCode != 13) return;
	    if (!this.$el.find(".department").val()) return;
	    this.collection.create({company: this.collection.company_id.attributes.id,name: this.$el.find(".department").val(),company_id:this.collection.company_id},{wait: true});
	    this.$el.find(".department").val(''); 
	}
 
});

var companies = new CompanyList();
//var company = new Company;


// Вид приложения

var AppView = Backbone.View.extend({

el: $("#content"),

events: {
    "keypress #company":  "createOnEnter",
},

initialize: function() {
	this.input_company = this.$("#company");
	companies.bind('add', this.addOne, this);
	companies.fetch();
},

render: function() {
},

addOne: function(todo) {
    var view = new CompanyView({model: todo});
    $(".company_container").append(view.render().el);
  },

createOnEnter: function(e) {
    if (e.keyCode != 13) return;
    if (!this.input_company.val()) return;

    companies.create({name: this.input_company.val()});
    this.input_company.val('');
  },

});

//запускаем приложение
var App = new AppView();	

Backbone.history.start();  // Запускаем HTML5 History push    


});