define([

  // Libs
//  'backbone',
  './modules/orders/models/Order',   
  './modules/regnums/models/Regnum',  
  './modules/orders/views/OrderIndexView',
  './modules/orders/views/OrderViewView',
  './modules/orders/views/OrderAddView', 
  './modules/regnums/views/RegnumsIndexView',
  './modules/regnums/views/RegnumViewView',
  './modules/regnums/views/RegnumAddView',    
  './modules/rm/views/RmIndexView',  
  './modules/po/views/PoIndexView',  
  './modules/equipment/views/EquipmentIndexView',  
  './modules/equipment/views/EquipmentViewView',   
  './modules/departments/views/DepartmentIndexView',
  './modules/eqtypes/views/EqtypesIndexView', 
  './modules/users/views/UserIndexView'  

], function(Order,Regnum,OrderIndexView,OrderViewView,OrderAddView,RegnumsIndexView,RegnumViewView,RegnumAddView,RmIndexView,PoIndexView,EquipmentIndexView,EquipmentViewView,DepartmentIndexView,EqtypesIndexView,UserIndexView) {
	//объявим модель заказа
	window.order = new Order;

	//объявим модель учетной единицы
	window.regnum = new Regnum;
	
	window.App = new Backbone.View();
	//-----------Роутер	
	var AppController = Backbone.Router.extend({
		
		OrdersIndex: function() {
			window.App.undelegateEvents();
			window.App = new OrderIndexView();	
	    },
	    
	    OrderView: function(id) {
			window.App.undelegateEvents();
	    	window.App = new OrderViewView({id:id});	    	
	    },
	    
	    OrderAdd: function() {
			window.App.undelegateEvents();
	    	window.App = new OrderAddView();	    	
	    },
	    
	    RegnumsIndex: function() {
			window.App.undelegateEvents();
	    	window.App = new RegnumsIndexView();	    	
	    },
	    
	    RegnumView: function(id) {
			window.App.undelegateEvents();
	    	window.App = new RegnumViewView({id:id});	    	
	    },
	    
	    RegnumAdd: function() {
			window.App.undelegateEvents();
	    	window.App = new RegnumAddView();	    	
	    },
	    
	    RmIndex: function() {
			window.App.undelegateEvents();
	    	window.App = new RmIndexView();		    	
	    },
	    
	    EquipmentIndex: function() {
			window.App.undelegateEvents();
	    	window.App = new EquipmentIndexView();
	    },
	    
	    EquipmentView: function(id) {
	    	window.App.undelegateEvents();
	    	window.App = new EquipmentViewView({id:id});
	    },
	    
	    PoIndex: function() {
			window.App.undelegateEvents();
	    	window.App = new PoIndexView();
	    },
      
	    DepartmentsIndex: function() {
			window.App.undelegateEvents();
	    	window.App = new DepartmentIndexView();
	    },  
	    
	    EqtypesIndex: function() {
			window.App.undelegateEvents();
	    	window.App = new EqtypesIndexView();
	    },  
	    
	    UsersIndex: function() {
			window.App.undelegateEvents();
	    	window.App = new UserIndexView();
	    }  	      
	      
	});


  return AppController;

})	