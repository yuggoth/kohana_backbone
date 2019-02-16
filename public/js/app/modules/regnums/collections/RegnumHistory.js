define([

  // Libs
  'backbone',

  // Deps
  '../models/RegnumHistoryItem'

], function(Backbone, RegnumHistoryItem) {
	
	 var RegnumHistory = Backbone.Collection.extend({
			model: RegnumHistoryItem,	 
			url: '', 
			parse: function(response) {
				    return response.history;
			 }
		 });

  return RegnumHistory;

});	