define([

  // Libs
  'backbone',

  // Deps
  '../models/EquipmentHistoryItem'

], function(Backbone, EquipmentHistoryItem) {
	
	 var EquipmentHistoryList = Backbone.Collection.extend({
			model: EquipmentHistoryItem,	 
			url: '', 
		 });

  return EquipmentHistoryList;

});	