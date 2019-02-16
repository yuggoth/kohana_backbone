define([

  // Libs
  'backbone',
  '../models/Equipment',
  '../collections/EquipmentHistoryList',  
  '../views/ErrorView', 
  '../views/EquipmentView1',
  '../views/EquipmentHistoryListView',  
  'text!../templates/equipment-view-template.html' 
  
  ], function(Backbone,Equipment,EquipmentHistoryList,ErrorView,EquipmentView1,EquipmentHistoryListView,Template) {

	var EquipmentViewView = Backbone.View.extend({
		
		el: $("#content"),
		
		template: _.template(Template),

		
		initialize: function() {	
			window.eq = new Equipment;
			window.eq.url = "equipment/view/"+this.id;
			var id = this.id;
	   	    var el = this.$el;
			window.eq.fetch({success: function(model) {
			    var view = new EquipmentView1({model:model});		    
				$("#content").html(view.render().$el);
				var history = new EquipmentHistoryList();
		   	    history.url = "/log/showregnumposhistory/"+id;
		   	    history.fetch({success:function(coll){
				    var view1 = new EquipmentHistoryListView({collection: coll});
				    el.find("#history").find("table").html(view1.render().el);  		
	   	    },wait:true});	
			},
			error: function(model,response){	
	    	var view = new ErrorView({model:response.responseText});
    		$("html").append(view.render().$el);
    		setTimeout(function() { view.$el.fadeOut('slow'); }, 2000);}}); 
		},
		
		render: function() {
		     this.$el.html(this.Template);
		}

		});

  return EquipmentViewView;

});