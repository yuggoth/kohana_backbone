define([

  // Libs
  'backbone',

  // Deps
  '../models/RegnumPosition'

], function(Backbone, RegnumPosition) {
	
	 var RegnumFreeList = Backbone.Collection.extend({
			model: RegnumPosition,	 
			url: '/eqwidget/freepo', 
		 });

  return RegnumFreeList;

});	