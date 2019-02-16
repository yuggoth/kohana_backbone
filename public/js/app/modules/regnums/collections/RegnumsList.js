define([

  // Libs
  'backbone-paginator',

  // Deps
  '../models/RegnumForIndex'

], function(BackbonePaginator, RegnumForIndex) {
 var RegnumsList = Backbone.Paginator.requestPager.extend({
	 	     model: RegnumForIndex,
	 	    paginator_core: {
	    	 type: 'GET',
	    	 // тип ответа (jsonp по-умолчанию)
	    	 dataType: 'json',	    	 
	    	 // URL коллекции
	    	 url: '/regnum/getallregnums'
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
	    	 // поле для поиска по ответственному лицу
	    	 regnumSearchFace: null,
	    	 // поле для поиска по отделу
	    	 regnumSearchDepartment: null
	 	    },
	 	    
			server_api: {
				// number of items to return per request/page
				'per_page': function() { return this.perPage },
				
				// how many results the request should skip ahead to
				'page': function() { return this.currentPage },
				
				'face_search': function() { return $("#regnum_search_face").val() },
				
				'department': function() { return $("#regnum-index-department-container").find("select").val() }

			},
	    	 
	    	 parse: function (response) {
	    		 var tags = response.regnum;
	    		 // рассчитываем количество страниц
	             this.totalPages = Math.floor(response.count / this.perPage);
	    		 this.totalRecords = response.count;
	    		 return tags;
	    		 },
	 	 	    initialize: function() {

				},
  });

  return RegnumsList;

});