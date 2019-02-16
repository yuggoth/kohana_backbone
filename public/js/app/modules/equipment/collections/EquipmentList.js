define([

  // Libs
  'backbone-paginator',

  // Deps
  '../models/Equipment'

], function(BackbonePaginator, Equipment) {
	
	 var EquipmentList = Backbone.Paginator.requestPager.extend({
			model: Equipment,	  
	 	    paginator_core: {
		    	 type: 'GET',
		    	 // тип ответа (jsonp по-умолчанию)
		    	 dataType: 'json',	    	 
		    	 // URL коллекции
		    	 url: '/equipment/getallequipment'
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
		    	 // поле для поиска номер заказа
		    	 equipment_type: null,
		    	 // поле для поиска дата заказа
		    	 name: null,
		    	 // поле для поиска по серийному номеру	    	 
		    	 serial_number: null,
		    	 all_spis: false,
		    	 all_otkr: false
		 	    },
				server_api: {
					// number of items to return per request/page
					'per_page': function() { return this.perPage },
					
					// how many results the request should skip ahead to
					'page': function() { return this.currentPage },
					
					'equipment_name': function() { return $("#equipment_name").val() },
					
					'equipment_type': function() { return $("#equipment_type").val() },
					
					'serial_number': function() { return $("#equipment_serial_number").val() },
					
					'all_spis': function() { return $("#all_spis").is(':checked') },
					
					'all_otkr': function() { return $("#all_otkr").is(':checked') },					

				},
		    	 
		    	parse: function (response) {
		    		 var tags = response.equipment;
		    		 // рассчитываем количество страниц
		             this.totalPages = Math.ceil(response.count / this.perPage);
		    		 this.totalRecords = response.count;
		    		 return tags;
		    	},
		 });

  return EquipmentList;

});	