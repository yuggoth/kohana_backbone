define([

  // Libs
  'backbone',

  // Deps
  './OrderView'

], function(Backbone, OrderView) {

	 var OrdersListView = Backbone.View.extend({
		 	 tagName: 'tbody',
		  
		     initialize: function() {
				 console.log('OrderListView initialize');  		    	 
		     },
		  
		     render: function() {
		    	 this.$el.append('<tr class="table_index_title"><td>Дата счета</td><td>Номер счета</td><td>Поставщик</td><td>Заказчик</td><td>Номер заявки</td><td>Дата заявки</td></tr>');
		         this.collection.each(function(model) {
		             var view = new OrderView({model: model});
		             this.$el.append(view.render().$el);
		         }, this);
		  
		         return this;
		     },
		  
		 });

  return OrdersListView;

});