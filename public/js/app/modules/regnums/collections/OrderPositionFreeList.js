define([

  // Libs
  'backbone',

  // Deps
  '../models/OrderPosition'

], function(Backbone, OrderPosition) {
	
	 var OrderPositionFreeList = Backbone.Collection.extend({
			model: OrderPosition,	 
			url: '/eqwidget/freeequipment', 
			parse: function(response) {
				window.free_pos.reset(response.equipment);
				window.free_po.reset(response.po);
				window.bu_pos.reset(response.bu_equipment);	
				window.bu_po.reset(response.bu_po);
				 return true;
			}
		 });

  return OrderPositionFreeList;

});	