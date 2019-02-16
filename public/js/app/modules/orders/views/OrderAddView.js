define([

  // Libs
  'backbone',
  '../models/Order',
  '../views/OrderViewEdit', 
  '../models/OrderPosition',  
  '../views/OrderPositionView',  
  '../views/OrderPositionListView',   
  '../views/ErrorView',     
  '../views/SuccessView',  
  'text!../templates/order-view-add-template.html'  

  
], function(Backbone,Order,OrderViewEdit,OrderPosition,OrderPositionView,OrderPositionListView,ErrorView,SuccessView,Template) {

	var OrderAddView = Backbone.View.extend({
		
		el: $("#content"),
		
		template: _.template(Template),	
		
	    events: {
		      "click #add_to_zakaz_table": "addPosition", 
		      "click button.order_save_button" : "submitOrder",
		},		
		
		initialize: function() {
		  this.render();
		  window.order
	    //	.on('change', function( model, coll ) {
	   // 		var view = new OrderViewEdit({model:model});
		//   	    $("#zakaz_form").html(view.render().$el);
	   // 	}) 
	    	.on('add:positions', function( model, coll ) {
	    		var view = new OrderPositionListView({collection:window.order.get("positions")});
		   	    view.undelegateEvents();
	    		$("#table_zakaz_container").html(view.render().$el);
	    	})
	    	.on('remove:positions', function( model, coll ) {
	    		console.log( 'remove %o', model )
	    	})	
	    	.on('invalid', function(model, error){
	    		var view = new ErrorView({model:error});
	    		$("html").append(view.render().$el);
	    		setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
	    	});		  
		  window.order.get("positions").reset();
		  window.order.unset("id");
		  window.order.unset("buhdoc");
		  window.order.set(order.defaults());
		//  if (!window.order.get("positions").length) {
		  window.order.get("positions").push(new OrderPosition);
		//  }
	    		var view = new OrderViewEdit({model:order});
		   	    $("#zakaz_form").html(view.render().$el);	
	    },
	    
		render: function() {	
		     this.$el.html(this.template);
		     return this;
		},

		addPosition: function(e) {
			window.order.get("positions").push(new OrderPosition);
	    },
	    
		submitOrder: function(model){
			var i = 0;
			window.order.get("positions").forEach(function(model){
				
				window.error = model.validate(model.attributes);
				
				if (model.get("warranty_view") === "true" && !window.error) {
					window.error = model.get("is_warranty").validate(model.get("is_warranty").attributes);
				}
				
				if (model.get("po_view") === "true" && !window.error) {
					window.error = model.get("is_po").validate(model.get("is_po").attributes);
				}
				
				if (model.get("show_serial_numbers") === "true" && !window.error) {
					model.get("serial_numbers").forEach(function(model1){
					window.error = model1.validate(model1.attributes);
					});
				}
						
				if (window.error) {
		    		var view = new ErrorView({model:window.error});
		    		$("html").append(view.render().$el);
		    		setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
		    		i++;
			}
			});
			if (i==0) {
			window.order.url = "/orders/add";
			window.order.save(null,{
				    success: function(model,response){	
				    	var view = new SuccessView({model:'Успешно сохранено'});
			    		$("html").append(view.render().$el);
			    		setTimeout(function() { view.$el.fadeOut('slow'); }, 2000);
			    		document.location.href = '#/orders/view/'+response;
			    		
				    },
				    error: function(model,response){
				    	var view = new ErrorView({model:response.responseText});
				    	$("html").append(view.render().$el);
				    	setTimeout(function() { view.$el.fadeOut('slow'); }, 2000);},
				    	validate:true,
				    	wait:true
			    });
			}
			return false;
		}
	    
	});
	
  return OrderAddView;

});