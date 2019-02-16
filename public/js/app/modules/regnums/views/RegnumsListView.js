define([

  // Libs
  'backbone',

  // Deps
  './RegnumView'

], function(Backbone, RegnumView) {

	 var RegnumsListView = Backbone.View.extend({
		 	tagName: 'tbody',
		  
		     initialize: function() {
		     },
		  
		     render: function() {
		    	 this.$el.append('<tr class="table_index_title"><td>Дата ввода в эксплуатацию</td><td>Компания</td><td>Подразделение</td><td>Ответственное лицо</td></tr>');
		         this.collection.each(function(model) {
		             var view = new RegnumView({model: model});
		             this.$el.append(view.render().el);
		         }, this);
		  
		         return this;
		     },
		  
		 });

  return RegnumsListView;

});