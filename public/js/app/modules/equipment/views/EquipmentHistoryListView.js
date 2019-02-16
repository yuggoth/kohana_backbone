define([

  // Libs
  'backbone',

  // Deps
  '../views/EquipmentHistoryItemView'

], function(Backbone, EquipmentHistoryItemView) {
	
	 var EquipmentHistoryListView = Backbone.View.extend({
	 	 	tagName: 'tbody',		 
			initialize: function() {
				
			},
	 
	 		render: function() {
		    	 this.$el.append('<tr class="table_index_title"><td>Действие</td><td>Отдел</td><td>Ответственное лицо</td><td>Комментарий</td></tr>');
		         this.collection.each(function(model) {
		             var view = new EquipmentHistoryItemView({model: model});
		             this.$el.append(view.render().$el);
		         }, this);
		  
		         return this;	 			
	 		}
		 });

  return EquipmentHistoryListView;

});	