define([

  // Libs
  'backbone-paginator',

  // Deps
  '../models/OrderForIndex'

], function(BackbonePaginator, OrderForIndex) {
 var OrdersList = Backbone.Paginator.requestPager.extend({
	 	     model: OrderForIndex,
	 	    paginator_core: {
	    	 type: 'GET',
	    	 // тип ответа (jsonp по-умолчанию)
	    	 dataType: 'json',	    	 
	    	 // URL коллекции
	    	 url: '/orders/getallorders'
	 	     },	 
	 	    paginator_ui: {
    		 // самая первая страница к которой можно получить доступ
    		 firstPage: 1,
    		 // установить текущую страницу
	    	 currentPage: 1,
	    	 // количество выводимых моделей на странице
	    	 perPage: 10,
	    	 // количество запрошенных страниц для показа
	    	 totalPages: 10,
	    	 // показывать все заказы
	    	 allOrders: false,
	    	 // поле для поиска номер заказа
	    	 invoiceNumber: null,
	    	 // поле для поиска дата заказа
	    	 invoiceDate: null
	 	    },
	 	    
			server_api: {
				// number of items to return per request/page
				'per_page': function() { return this.perPage },
				
				// how many results the request should skip ahead to
				'page': function() { return this.currentPage },
				
				'all_orders': function() { return $("#all_orders").is(':checked') },
				
				'invoice_number': function() { return $("#invoice_number").val() },
				
				'invoice_date': function() { return $("#invoice_date").val() }

				// custom parameters
			//	'callback': '?'
			},
	    	 
	    	 parse: function (response) {
	    		 var tags = response.orders;
	    		 // рассчитываем количество страниц
	             this.totalPages = Math.ceil(response.count / this.perPage);
	    		 this.totalRecords = response.count;
	    		 return tags;
	    		 },
	 	 	    initialize: function() {
	 	 	    	
				},
  });

  return OrdersList;

});