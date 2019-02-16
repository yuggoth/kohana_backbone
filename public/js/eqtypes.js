$(function () {

//Модель типа оборудования
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

// Коллекция типов

var TypeList = Backbone.Collection.extend({
	  model: Type,
	  url: '/eqtypes/collection'
	});


//Вид типа оборудования

var TypeView = Backbone.View.extend({
  tagName:  "tr",
	className: "table_index_tr_no_title",

  template: _.template($('#eq-type').html()),

  events: {
    "click .order_remove"  : "deleteType",
    "dblclick td"  : "edit",
    "keypress .edit"  : "updateOnEnter",
    "blur .edit"      : "close"
  },

  initialize: function() {
    this.model.bind('change', this.render, this);
    this.model.bind('destroy', this.remove, this);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.input = this.$('.edit');
    return this;
  },
  
  edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },

  deleteType: function() {
	if(!confirm('Удалить?')) return;
   this.model.clear();
  },
  
  close: function() {
      var value = this.input.val();
      this.model.url = '/eqtypes/model/'+this.model.attributes.id;
      this.model.save({name:value},{validate : true});
      this.$el.removeClass("editing");
    }, 
    
  updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

});

var Types = new TypeList();

// Вид приложения

var AppView = Backbone.View.extend({

el: $("#content"),

events: {
    "keypress #eq_type":  "createOnEnter",
},

initialize: function() {
	this.input = this.$("#eq_type");
	Types.bind('add', this.addOne, this);
	Types.bind('all', this.render, this);
	Types.fetch();
},

render: function() {
 //   Types.each(this.addOne, this);
 //   return this;
},

addOne: function(todo) {
    var view = new TypeView({model: todo});
    $(".table_content").append(view.render().el);
  },

createOnEnter: function(e) {
    if (e.keyCode != 13) return;
    if (!this.input.val()) return;

    Types.create({name: this.input.val()});
    this.input.val('');
  },

});

//запускаем приложение
var App = new AppView();	

Backbone.history.start();  // Запускаем HTML5 History push    


});