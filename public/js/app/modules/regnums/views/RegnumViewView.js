define([

  // Libs
  'backbone',
  '../models/Regnum',
  '../models/RegnumPosition',
  '../models/OrderPosition',    
  '../collections/OrderPositionFreeList',    
  '../collections/RegnumFreeList', 
  '../collections/OrderPositionTypeList',   
  '../collections/RegnumHistory',    
  '../views/RegnumEditView',
  '../views/OrderPositionFreeView',  
  '../views/RegnumPositionView',    
  '../views/RegnumHistoryView', 
  '../views/RegnumHistoryItemView',   
  '../views/ErrorView',   
  '../views/RegnumPositionListView', 
  '../views/RegnumPositionFreeView',
  'text!../templates/regnum-add-template.html' 
  
  ], function(Backbone,Regnum,RegnumPosition,OrderPosition,OrderPositionFreeList,RegnumFreeList,OrderPositionTypeList,RegnumHistory,RegnumEditView,OrderPositionFreeView,RegnumPositionView,RegnumHistoryView,RegnumHistoryItemView,ErrorView,RegnumPositionListView,RegnumPositionFreeView,Template) {

	var RegnumViewView = Backbone.View.extend({
		
		el: $("#content"),
		
		template: _.template(Template),

		
		initialize: function() {
			this.render();		
			window.regnum.get("positions").reset();
	    	window.regnum.set(window.regnum.defaults());			
			var eqtypes = new OrderPositionTypeList(eqtypes_data);
	    	window.regnum
	    	.on( 'add:positions', function( model, coll ) {
			     var view = new RegnumPositionListView({collection:window.regnum.get("positions")});		     			    	 
				 $(".uchet_cart").html(view.render().$el);	    		
	    	})
	    	.on( 'remove:positions', function( model, coll ) {
	    		console.log( 'remove %o', model )
	    	})	
	    	.on('invalid', function(model, error){
	    		var view = new ErrorView({model:error});
	    		$("html").append(view.render().$el);
	    		setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
	    		
	    	});		
	    	
	    	window.regnum.url = "/regnum/view/"+this.id;
	    	var id = this.id;
	   	    var el = this.$el;
	    	window.regnum.fetch();	
    		var view = new RegnumEditView({model:window.regnum});
	   	    this.$el.find(".search").html(view.render().$el);
	   	 setTimeout(function() { 
		   	    var history = new RegnumHistory();
	    		history.url = "/log/showregnumhistory/"+id;
		   	    history.fetch({success:function(model,coll){
					    var view = new RegnumHistoryView({collection: coll});
					    el.find("#regnum_history").find("table").html(view.render().el);  		
		   	    },wait:true});
	   	 
	   	 
	   	 }, 1000);	   	   	    
	   	    window.bu_pos = new RegnumFreeList();
	   	    window.bu_po = new RegnumFreeList();
	   	    
	   	    window.free_po = new OrderPositionFreeList();
	   	    window.free_pos = new OrderPositionFreeList();	   	 	
	   	    
	   	    window.free_pos
	    	.on('reset', function(coll) {
	    		 $("#free_device").append('<tbody><tr><td style="background:#F2F2F2" colspan="5">Новое оборудование</td></tr></tbody>');
	    		coll.forEach(function(model){
	    		view = new OrderPositionFreeView({model:model});
		   	    $("#free_device").append(view.render().$el);
	    		});
	    	}); 	
	    	
	   	    window.free_po
	    	.on('reset', function(coll) {
	    		 $("#free_device").append('<tbody><tr><td style="background:#F2F2F2" colspan="5">Новое ПО</td></tr></tbody>');
	    		coll.forEach(function(model){
	    		model.set({"count":model.get("count_licenses")});
	    		view = new OrderPositionFreeView({model:model});
		   	    $("#free_device").append(view.render().$el);
	    		});
	    	}); 
	    	
	   	    window.bu_pos
	    	.on('reset', function(coll) {
	    		 $("#free_device").append('<tbody><tr><td style="background:#F2F2F2" colspan="5">Оборудование б/у</td></tr></tbody>');
	    		coll.forEach(function(model){
	    		model.set({"count":1,"count_used":0});	
	    		view = new RegnumPositionFreeView({model:model});
		   	    $("#free_device").append(view.render().$el);
	    		});
	    	});
	   	    
	   	    window.bu_po
	    	.on('reset', function(coll) {
	    		 $("#free_device").append('<tbody><tr><td style="background:#F2F2F2" colspan="5">ПО б/у</td></tr></tbody>');
	    		coll.forEach(function(model){
		    	model.set({"count":1,"count_used":0});		    			
	    		view = new RegnumPositionFreeView({model:model});
		   	    $("#free_device").append(view.render().$el);
	    		});
	    	}); 
	    	
	   	    free_positions = new OrderPositionFreeList();
	   	    free_positions.fetch();	    	
	   	    
		},
		
		render: function() {
		     this.$el.html(this.template);
		}

		});

  return RegnumViewView;

});