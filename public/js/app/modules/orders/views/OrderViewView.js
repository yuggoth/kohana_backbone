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
  'text!../templates/order-view-view-template.html'
  
], function(Backbone,Order,OrderViewEdit,OrderPosition,OrderPositionView,OrderPositionListView,ErrorView,SuccessView,Template) {

	var OrderViewView = Backbone.View.extend({
		
		el: $("#content"),
		
		template: _.template(Template),	
		
	    events: {
		      "click #add_to_zakaz_table": "addPosition", 
		      "click button.order_save_button" : "submitOrder",
		      "click button.order_prihod_button" : "submitprihodOrder"
		},		
		
		initialize: function() {
			window.order.get("positions").reset();
			window.order.set(window.order.defaults);	
			//костыли
			$("#zakaz_form").remove();
			$("#table_zakaz").remove();
			this.render();

			window.order
	    //	.on('change', function( model, coll ) {
	    //		var view = new OrderViewEdit({model:model});
		//   	    $("#zakaz_form").html(view.render().$el);
	    // 	}) 
	    	.on( 'add:positions', function( model, coll ) {
	    		var view = new OrderPositionListView({collection:window.order.get("positions")});
	    		view.undelegateEvents();
	    		$("#table_zakaz_container").html(view.render().$el);
	    	})
	    	.on( 'remove:positions', function( model, coll ) {
	    		console.log( 'remove %o', model )
	    	})
	    	.on('invalid', function(model, error){
	    		var view = new ErrorView({model:error});
	    		$("html").append(view.render().$el);
	    		setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
	    		
	    	});
			
			window.order.url = "/orders/view/"+this.id;
			window.order.fetch({success: function(model) {
			    var view = new OrderViewEdit({model:model});
				$("#zakaz_form").html(view.render().$el);
	    		var view = new OrderPositionListView({collection:model.get("positions")});
		   	    $("#table_zakaz_container").html(view.render().$el);
			},
			error: function(model,response){
	    	$("html").find("form").remove();	
	    	var view = new ErrorView({model:response.responseText});
    		$("html").append(view.render().$el);
    		setTimeout(function() { view.$el.fadeOut('slow'); }, 2000);}});
		},
		
		render: function() {
		     this.$el.html(this.template);
	            return this;
		},	
		
		addPosition: function(e) {
			window.order.get("positions").push(new OrderPosition);
	    },
	    
		submitOrder: function(){
			var i = 0;
			window.order.get("positions").forEach(function(model){
				var error = model.validate(model.attributes);
				
				if (model.get("po_view") === "true" && !error) {
					var error = model.get("is_po").validate(model.get("is_po").attributes);
				}
				if (model.get("warranty_view") === "true" && !error) {
					var error = model.get("is_warranty").validate(model.get("is_warranty").attributes);
				}				
				if (model.get("serial_numbers").length && !error) {
					model.get("serial_numbers").forEach(function(model){
					var error = model.validate(model.attributes);
					});
				}
				if (error) {
		    		var view = new ErrorView({model:error});
		    		$("html").append(view.render().$el);
		    		setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
		    		i++;
			}
			});
			if (i==0) {
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
		},
	    
		submitprihodOrder: function(){
			console.log('submitprihodOrder');
			if (window.order.get('positions').where({"prihod":true}).length > 0) {
				var i = 0;
				window.order.get("positions").forEach(function(model){
					var error = model.validate(model.attributes);
					if (error) {
			    		var view = new ErrorView({model:error});
			    		$("html").append(view.render().$el);
			    		setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
			    		i++;
				}
				});
				console.log('прошло');
				if (i==0) {
					if (window.order.get("buhdoc").attributes.date !== undefined) {
						var error = window.order.get("buhdoc").validate(window.order.get("buhdoc").attributes);					
					} else {
						var error = "Надо заполнить бухгалтерские документы";
					}
					console.log('до сюда дошло!');
					if (error) {
			    		var view = new ErrorView({model:error});
			    		$("html").append(view.render().$el);
			    		setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
					} else {
						console.log('и до сюда дошло!');
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
				}

			} else {
				var view = new ErrorView({model:'Необходимо отметить пришедшие позиции галочками'});
	    		$("html").append(view.render().$el);
	    		setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
			}
			return false;
		}
		
		

		});

  return OrderViewView;

});