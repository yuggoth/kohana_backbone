define([

  // Libs
  'backbone',
  // Deps
  'text!../templates/order-position-serial-number-template.html'

], function(Backbone,Template) {

	 var OrderPositionSerialNumberView = Backbone.View.extend({
		   tagName: "p",
		   className: "",
		   template: _.template(Template),

		   events: {
			   "blur input" : "changeSerialNumber"
		   },

		   initialize: function() {  
			 this.model.bind('change', this.render, this);
		     this.model.bind('destroy', this.remove, this);
		//     this.model.bind('add',this.addSN,this)
		   },

		   render: function() {
		     this.$el.html(this.template(this.model.toJSON()));
		     return this;
		   },
		   
		   changeSerialNumber: function(){
			   this.model.set({"serial_number": this.$("input").val()});
		   },
		   
		//   addSN: function(){
	   //         var view = new OrderPositionSerialNumberView({model: this.model});
	   //         this.$el.append(view.render().el);		    
		//   }

		 });

  return OrderPositionSerialNumberView;

});