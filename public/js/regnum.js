$(function () {

//-----------Роутер	
	
	var Controller = Backbone.Router.extend({
	    routes: {
	    	"":                "regnum",    // #regnum
	        "view/:id":        "view",  // #regnum/view/80
	        "add":             "add",  // #regnum/add
	    },

	      regnum: function() {

	      },
	      
	      add: function() {
  
	      },
	    
	      view: function(id, page) {

	      }

	});	
	
	//----------Модели и коллекции		
	
//Модель учетной единицы
	 var Regnum = Backbone.RelationalModel.extend({
	 });	
	
//Модель позиции учетной единицы	 
	 var RegnumPos = Backbone.RelationalModel.extend({
	 });		 
	
//Модель позиции заказа
	
//Модель записи в истории		 
	 var RegnumHistory = Backbone.RelationalModel.extend({
	 });		 

//Модель позиции записи в истории	 
	 var RegnumPosHistory = Backbone.RelationalModel.extend({
	 });

//Коллекция учетных единиц	 
	 var RegnumList = Backbone.Collection.extend({
		 	model: Regnum,
		 	url: ''
	 });	 

//Коллекция позиций учетных единиц	 
	 var RegnumPosList = Backbone.Collection.extend({
		 	model: RegnumPos,
		 	url: ''
	});	
	 
//Коллекция записей в истории	 
	 var RegnumHistoryList = Backbone.Collection.extend({
		 	model: RegnumHistory,
		 	url: ''
	});	 
	 
//Коллекция позиций записей в истории	 
	 var RegnumPosHistoryList = Backbone.Collection.extend({
		 	model: RegnumPosHistory,
		 	url: ''
	});	 
	 
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