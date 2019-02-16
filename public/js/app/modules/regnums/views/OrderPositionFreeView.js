define([

  // Libs
  'backbone',    
  '../models/RegnumPosition',
  '../models/Order',  
  '../views/RegnumPositionView',  
  '../views/OrderPositionSerialNumberListView',  
  '../views/OrderDialogView',    
  'text!../templates/regnum-free-order-position-template.html'

], function(Backbone,RegnumPosition,Order,RegnumPositionView,OrderPositionSerialNumberListView,OrderDialogView,Template) {

	 var OrderPositionFreeView = Backbone.View.extend({
		    tagName:  "tbody",
		// 	className: "table_zakaz_position",

		   template: _.template(Template),

		   events: {
			   "click .add_for_uchet" : "addForUchet",
			   "click .show_zakaz_info" : "showOrderInfo",
		   },

		   initialize: function() {
		     this.model.bind('change', this.render, this);
		     this.model.bind('destroy', this.remove, this);

		   },

		   render: function() {
		     this.$el.html(this.template(this.model.toJSON()));
		     if (this.model.attributes.count - this.model.attributes.count_used == 0) {
		    	 this.$el.hide();
		     } else {
		    	 this.$el.show();		    	 
		     }
		     if (this.model.get("serial_numbers") && this.model.get("serial_numbers").length > 1) {	
		    	 var view = new OrderPositionSerialNumberListView({collection:this.model.get("serial_numbers")});
				 this.$el.append(view.render().el);
		     }
		     return this;
		   },
		   
		   addForUchet: function() {
			   if (this.model.get("serial_numbers") && this.model.get("serial_numbers").length > 1) {
				   this.$el.find("tr:last-child").slideToggle();
				   
			   } else {
				   this.model.set({"count_used":parseInt(this.model.attributes.count_used)+1});
			//	   if (parseInt(this.$el.children("tr").children("td:eq(3)").text()) - 1 == 0) {
			//		   this.$el.slideUp("slow");
			//	   } else {
			//		   this.$el.children("tr").children("td:eq(3)").text(this.model.get("count") - this.model.get("count_used") - 1);
			//	   }	

				   var new_pos = new RegnumPosition;
				   if (this.model.get("serial_numbers")) {
					   this.model.get("serial_numbers").forEach(function(sn){
						   new_pos.set({"serial_number":sn.attributes.serial_number});
					   });
				   }
				   new_pos.set({"name":this.model.attributes.name,"equipment_type_id":this.model.attributes.equipment_type_id,"ispo":this.model.attributes.ispo,"orders_positions_id":this.model.attributes.id});
				   regnum.get("positions").push(new_pos);
				//   var view = new RegnumPositionView({model:new_pos});
	            //   $(".uchet_cart").find("table").append(view.render().el);				   
			   }			   

			   return false;			   
		   },
		   
		   showOrderInfo: function() {
			   $(".vspl_div").not(this.$el.find(".vspl_div")).hide();
			   if (this.$el.find(".vspl_div").hasClass("show")) {
				   this.$el.find(".vspl_div").hide();
				   this.$el.find(".vspl_div").removeClass("show");
			   } else {	
			   this.$el.find(".vspl_div").addClass("show");						   
			   var model = new Order;
			   var el = this.$el;
			   model.url = this.$el.find(".show_zakaz_info").attr('href');
			   this.$el.find(".vspl_div").show();
			   model.fetch({success: function(){
				   var view = new OrderDialogView({model:model});
				   el.find(".vspl_div").html(view.render().el);				   		   
			   }});	
			   }
			   return false;
		   }

		 }); 		

  return OrderPositionFreeView;

});