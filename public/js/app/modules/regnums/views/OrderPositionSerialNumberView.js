define([

  // Libs
  'backbone',    
  '../models/RegnumPosition',
  '../views/RegnumPositionView',   
  'text!../templates/order-position-serial-number-template.html'

], function(Backbone,RegnumPosition,RegnumPositionView,Template) {

	 var OrderPositionSerialNumberView = Backbone.View.extend({
		    tagName:  "p",

		   template: _.template(Template),

		   events: {
			   "click" : "addForUchet"			   
		   },

		   initialize: function() {
		     this.model.bind('change', this.render, this);
		   //this.model.bind('destroy', this.remove, this);
		   },

		   render: function() {
		     this.$el.html(this.template(this.model.toJSON()));	
		     if (this.model.get("changed")) {
		    	 this.$el.hide();
		     }
		     return this;
		   },
		   
		   addForUchet: function() {
			   this.model.set({"changed":true});
			   var new_pos = new RegnumPosition;
			   new_pos.set({"name":this.model.get("position_id2").attributes.name,"equipment_type_id":this.model.get("position_id2").attributes.equipment_type_id,"orders_positions_id":this.model.get("position_id2").attributes.id,"serial_number":this.model.get("serial_number")});
               
			//   var view = new RegnumPositionView({model:new_pos});
               this.model.get("position_id2").set({"count_used": parseInt(this.model.get("position_id2").attributes.count_used)+1});
               this.$el.slideUp();
			   regnum.get("positions").push(new_pos);               
           //    $(".uchet_cart").find("table").append(view.render().el);						   
		   }

		 }); 		

  return OrderPositionSerialNumberView;

});