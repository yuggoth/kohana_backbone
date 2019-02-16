define([

  // Libs
  'backbone',

  // Deps
  './EquipmentView'

], function(Backbone, EquipmentView) {

	 var EquipmentListView = Backbone.View.extend({
		 	 tagName: 'tbody',
		  
		     initialize: function() {	    	 
		     },
		  
		     render: function() {
		    	 this.$el.append('<tr class="table_index_title"><td>Учетная единица</td><td>Наименование</td><td>Класс оборудования</td><td>Отдел</td><td>Ответственное лицо</td></tr>');
		         this.collection.each(function(model) {
		             var view = new EquipmentView({model: model});
		             this.$el.append(view.render().$el);
		         }, this);
		  
		         return this;
		     },
		  
		 });

  return EquipmentListView;

});