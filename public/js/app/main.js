requirejs([

  // Libs
  'jquery',

  // Deps
  'modules/orders/collections/OrdersList',
  'modules/orders/views/OrdersListView',
  'modules/orders/collections/OrderCompanyList',
  'modules/orders/collections/OrderPositionTypeList',
  'modules/orders/views/OrderIndexView',
  'modules/orders/views/OrderViewView',
  'modules/orders/views/OrderAddView', 
  'modules/regnums/views/RegnumsIndexView',
  'modules/regnums/views/RegnumViewView',  
  'AppController'

], function($, OrdersList, OrdersListView,OrderCompanyList,OrderPositionTypeList,OrderIndexView,OrderViewView,OrderAddView,RegnumsIndexView,RegnumViewView,AppController) {

			var routes = {
					"orders":"OrdersIndex",
					"orders/view/:id":"OrderView",
					"orders/add":"OrderAdd",
					"auth/users":"UsersIndex",
					"department":"DepartmentsIndex",
					"eqtypes": "EqtypesIndex",
					"regnum": "RegnumsIndex",
					"regnum/view/:id":"RegnumView",
					"regnum/add":"RegnumAdd",	
					"rm":"RmIndex",
					"equipment":"EquipmentIndex",
					"equipment/view/:id":"EquipmentView",
					"po":"PoIndex"
					};
			
			var routes1 = new Array(
					{"orders":"OrdersIndex"},
					{"orders/view/:id":"OrderView"},
					{"orders/add":"OrderAdd"},
					{"auth/users":"UsersIndex"},
					{"department":"DepartmentsIndex"},
					{"eqtypes":"EqtypesIndex"},
					{"regnum":"RegnumsIndex"},
					{"regnum/view/:id":"RegnumView"},
					{"regnum/add":"RegnumAdd"},	
					{"rm":"RmIndex"},
					{"equipment":"EquipmentIndex"},
					{"equipment/view/:id":"EquipmentView"},					
					{"po":"PoIndex"}
					);

			
			
	//взависимости от ролей пользователя создадим для него роутер
			window.user_routes = new Array();
	if (_.indexOf(roles_data,"admin") !== -1) {
		controller = new AppController({routes:routes});		
	//	window.user_routes = ;
	} else {
		controller = new AppController();
		roles_data.forEach(function(role){
			if (role == 'order_view') {
				controller.route("orders","OrdersIndex");
				controller.route("orders/view/:id","OrderView");
			}
			
			if (role == 'order_add') {
				controller.route("orders/add","OrderAdd");				
			}
			
			if (role == 'regnum_view') {
				controller.route("regnum","RegnumsIndex");	
				controller.route("regnum/view/:id","RegnumView");
			}
			
			if (role == 'regnum_add') {
				controller.route("regnum/add","RegnumAdd");				
			}
			
			if (role == 'rm_view') {
				controller.route("rm","RmIndex");				
			}
			
			if (role == 'regnum_pos_view') {
				controller.route("equipment","EquipmentIndex");	
				controller.route("equipment/view/:id","EquipmentView");					
			}
			
			if (role == 'regnum_pos_view_po') {
				controller.route("po","PoIndex");				
			}			

		});
		

	}

	//создаем экземпляр коллекции компаний	
	window.companies = new OrderCompanyList(companies_data);	
//создаем экземпляр коллекции типов позиций	
	window.eqtypes = new OrderPositionTypeList(eqtypes_data);		
//  var collection = new OrdersList;
//  collection.fetch();

//  var view = new OrdersListView({
//    collection: collection
//  });
//  $("#content").append(view.render().$el);

  Backbone.history.start();    

});