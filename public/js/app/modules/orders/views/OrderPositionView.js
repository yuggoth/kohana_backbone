define([

  // Libs
//  'backbone',  
  '../models/OrderPosition',   
  '../views/OrderPositionTypeListView', 
  '../models/OrderPositionSerialNumber',  
  '../views/OrderPositionSerialNumberListView',
  '../models/OrderPositionPo',
  '../models/OrderPositionWarranty',  
  '../views/OrderPositionPoView', 
  '../views/OrderPositionWarrantyView',    
  '../views/OrderPositionInputPrihodView',
  '../views/OrderPositionInputPoView',
  '../views/OrderPositionInputWarrantyView', 
  '../views/OrderPositionInputRmView',  
  '../views/OrderPositionInputSNView',    
  'text!../templates/order-edit-position-template.html'

], function(OrderPosition,OrderPositionTypeListView,OrderPositionSerialNumber,OrderPositionSerialNumberListView,OrderPositionPo,OrderPositionWarranty,OrderPositionPoView,OrderPositionWarrantyView,OrderPositionInputPrihodView,OrderPositionInputPoView,OrderPositionInputWarrantyView,OrderPositionInputRmView,OrderPositionInputSNView,Template) {

	 var OrderPositionView = Backbone.View.extend({
		    tagName:  "div",
		 	className: "table_zakaz_position",

		   template: _.template(Template),

		   events: {
			"change select" : "changeEqtype",  				    
		    "click .copy_to_zakaz_table"  : "copyPosition",
		    "click .delete_to_zakaz_table" : "deletePosition",
		 	"change input:text": "changePosition",
		 	"change .position_count" : "recountSerialNumbers",
		 	"click .is_po input": "poPosition",
			"click .is_warranty input": "warrantyPosition",
		 	"click .is_serial_numbers input": "snPosition",
			"click .is_rm input": "rmPosition",			
			"click input.input_prihod": "addToPrihod"
		   },

		   initialize: function() {
		          if (this.model.get("serial_numbers").length) {
		        	  this.model.set({"show_serial_numbers": "true"});
		          }
		          if (this.model.get("is_po") !== null) {
		        	  this.model.set({"po_view": "true"});
		          }
		          if (this.model.get("is_warranty") !== null) {
		        	  this.model.set({"warranty_view": "true"});
		          }

		     this.model.bind('destroy', this.remove, this);
		     
		     var orderpos = this.model;
		     var posview = this.$el;
		     
		     this.model
		     .on('add:serial_numbers', function( model, coll ) {	    		
					var view = new OrderPositionSerialNumberListView({collection:orderpos.get("serial_numbers")});
					posview.find("span.serial-numbers-collection").html(view.render().$el);		    	
		   	    })
		   	 .on('remove:serial_numbers', function( model, coll ) {	    		
					var view = new OrderPositionSerialNumberListView({collection:orderpos.get("serial_numbers")});
					posview.find("span.serial-numbers-collection").html(view.render().$el);		    	
		   		})   
		   },

		   render: function() {
		     this.$el.html(this.template({model:this.model.toJSON()}));
		     
		   	 //отрисовка селекта с типами оборудования
		     var view = new OrderPositionTypeListView({model:this.model.get("equipment_type_id")});
		     this.$el.find("span.equipment-collection").html(view.render().$el);
		       	 
		   	 //отрисовка полей для ПО если это ПО	     
		   	 if (this.model.get("po_view") === "true") {
				var view = new OrderPositionPoView({model:this.model.get("is_po")});
				this.$el.append(view.render().$el);
		   	 }
		   	 
		   	 //отрисовка полей для гарантии если есть гарантия			   	 
		   	 if (this.model.get("warranty_view") === "true") {
			     console.log(this.model.get("is_warranty"));
					var view = new OrderPositionWarrantyView({model:this.model.get("is_warranty")});
					this.$el.append(view.render().$el);
			 }
		   	 
		   	 //отрисовка серийных номеров если они есть
		   	 if (this.model.get("show_serial_numbers") === "true") {		   	 
			    this.$el.find("span.serial-numbers-collection").show();
			    this.recountSerialNumbers();
				var view = new OrderPositionSerialNumberListView({collection:this.model.get("serial_numbers")});
				this.$el.find("span.serial-numbers-collection").html(view.render().$el);
		   	 }	

		   	 //отрисовка галочки серийные номера
		     if (this.model.get("show_serial_numbers") === "true") {
			   	 var view = new OrderPositionInputSNView({attributes:{"checked":"checked","type":"checkbox"}});
			 }	else {
			     var view = new OrderPositionInputSNView();
			 }
		     this.$el.find("span.is_serial_numbers").html(view.render().$el);
		     this.$el.find("span.is_serial_numbers").append(" Серийные номера");	
		     
		   	 //отрисовка галочки расходных материалов		     
		     if (this.model.get("rm_view") === "true") {
			   	 var view = new OrderPositionInputRmView({attributes:{"checked":"checked","type":"checkbox"}});
			 }	else {
			     var view = new OrderPositionInputRmView();
			 }
		     this.$el.find("span.is_rm").html(view.render().$el);
		     this.$el.find("span.is_rm").append(" Расходные материалы");			     

		   	 //отрисовка галочки ПО			     
		     if (this.model.get("po_view") === "true") {
		   	 var view = new OrderPositionInputPoView({attributes:{"checked":"checked","type":"checkbox"}});
		     }	else {
		     var view = new OrderPositionInputPoView();
		     }
		     this.$el.find("span.is_po").html(view.render().$el);
		     this.$el.find("span.is_po").append(" ПО");	

		   	 //отрисовка галочки гарантии		     
		     if (this.model.get("warranty_view") === "true") {
			 var view = new OrderPositionInputWarrantyView({attributes:{"checked":"checked","type":"checkbox"}});
		     } else {
			 var view = new OrderPositionInputWarrantyView();		    	 
		     }
			   	this.$el.find("span.is_warranty").html(view.render().$el);		   	 	
			   	this.$el.find("span.is_warranty").append(" Гарантия");
			   	
			 //отрисовка галочки для прихода
			 if (this.model.get("id")) {			   	
			     if (this.model.get("prihod")) {		    	 
		    	 var view = new OrderPositionInputPrihodView({attributes:{"checked":"checked","type":"checkbox"}});
			     } else {
			     var view = new OrderPositionInputPrihodView({attributes:{"type":"checkbox"}});			    	 
			     }
		    	 this.$el.append(view.render().$el);
		     }	
		     
               this.$el.find("input.table_zakaz_ajax_get").autocomplete({
              	    source: "/ajax/ajax?type=2",
                     minLength: 3,
             	    select: function(event, ui) {
              	    }
                 });
 	 
		     return this;
		   },
		 	
		   changePosition: function(e) {
		 	this.model.set({"name": this.$("input.position_name").val(),"count": this.$("input.position_count").val(),"summ": this.$("input.position_summ").val()}); 
		   },

		   copyPosition: function() {
			   var orderpos = new OrderPosition({
				   "count": this.model.attributes.count,
				   "summ" : this.model.attributes.summ,
				   "name" : this.model.attributes.name,
				   "equipment_type_id" : this.model.attributes.equipment_type_id,
				   "po_view" : this.model.attributes.po_view,
				   "warranty_view" :  this.model.attributes.warranty_view,
				   "show_serial_numbers" : this.model.attributes.show_serial_numbers
			   });
			   
			   if (this.model.get("is_po") !== null) {
				   orderpos.set({"is_po" : new OrderPositionPo({"count_licenses": this.model.attributes.is_po.attributes.count_licenses,
				          "sublicensing_contract": this.model.attributes.is_po.attributes.sublicensing_contract,
				          "unique_license_number": this.model.attributes.is_po.attributes.unique_license_number})});
			   }
			   
			   if (this.model.get("is_warranty") !== null) {
				   orderpos.set({"is_warranty" : new OrderPositionWarranty({"warranty_number": this.model.attributes.is_warranty.attributes.warranty_number,
				          "warranty_date": this.model.attributes.is_warranty.attributes.warranty_date,
				          "warranty_time": this.model.attributes.is_warranty.attributes.warranty_time})});
			   }
			   
			   window.order.get("positions").push(orderpos);
			   return false;
		   },
		   
		   changeEqtype: function() {
			   this.model.set({equipment_type_id:this.$el.find("select :selected").attr("id")});
		   },
		   
		   poPosition: function() {			   
			   if (this.model.get("po_view") === "false")  {
				//   var view = new OrderPositionPoView({model:this.model.set({"po": new OrderPositionPo({"orders_positions_id":this.model.attributes.id})})});
				   this.model.set({"po_view": "true"});
				   this.model.attributes.is_po = new OrderPositionPo;
			   } else {
				   this.model.set({"po_view": "false"});
				   this.model.unset("is_po");
				   this.$el.find(".is_po_div").remove();
			   }		
			   
			   	 //отрисовка полей для ПО если это ПО	     
			   	 if (this.model.get("po_view") === "true") {
					var view = new OrderPositionPoView({model:this.model.get("is_po")});
					this.$el.append(view.render().$el);
			   	 }
		   },

		   warrantyPosition: function() {
			   if (this.model.get("warranty_view") === "false") {
				//	var view = new OrderPositionWarrantyView({model:this.model.set({"warranty": new OrderPositionWarranty({"orders_positions_id":this.model.attributes.id})})});
				   this.model.set({"warranty_view": "true"});
				   this.model.attributes.is_warranty = new OrderPositionWarranty;				
			   } else {
				   this.model.set({"warranty_view": "false"});
				   this.model.unset("is_warranty");
				   this.$el.find(".is_warranty_div").remove();
			   }
			   
			   	 //отрисовка полей для гарантии если есть гарантия			   	 
			   	 if (this.model.get("warranty_view") === "true") {
				     console.log(this.model.get("is_warranty"));
						var view = new OrderPositionWarrantyView({model:this.model.get("is_warranty")});
						this.$el.append(view.render().$el);
				 }

		   },
		   
		   snPosition: function() {		
			   if (this.model.get("show_serial_numbers") === "false")  {
				    this.$el.find("span.serial-numbers-collection").show();
					var view = new OrderPositionSerialNumberListView({collection:this.model.get("serial_numbers")});
					this.$el.find("span.serial-numbers-collection").html(view.render().$el);				   
					this.model.set({"show_serial_numbers": "true"});
			   } else {
				    this.$el.find("span.serial-numbers-collection").hide();
				    this.model.get("serial_numbers").reset();
				    this.model.set({"show_serial_numbers": "false"});
			   }
			   
			   	 //отрисовка серийных номеров если они есть
			   	 if (this.model.get("show_serial_numbers") === "true") {		   	 
				    this.$el.find("span.serial-numbers-collection").show();
				    this.recountSerialNumbers();
					var view = new OrderPositionSerialNumberListView({collection:this.model.get("serial_numbers")});
					this.$el.find("span.serial-numbers-collection").html(view.render().$el);
			   	 }	
		   },
		   
		   rmPosition: function() {		
			   if (this.model.get("rm_view") === "false")  {
				   
					   this.model.set({"rm_view": "true"});
			   } else {

				   this.model.set({"rm_view": "false"});
			   }

		   },
		   
		   addToPrihod: function() {
			   if (this.model.get("prihod")) {
				this.model.set({"prihod":false}); 				   
			   } else {
			 	this.model.set({"prihod":true}); 
			   }
			   },
			   
		   recountSerialNumbers: function() {
			   if (this.model.get("serial_numbers") && this.model.get("show_serial_numbers") === "true") {
			   if (this.model.get("serial_numbers").length < this.model.get("count")) {
				   var i = 0;
				   var razn = this.model.get("count")-this.model.get("serial_numbers").length;
				   while (i < razn) {
					   this.model.get("serial_numbers").push(new OrderPositionSerialNumber({"orders_positions_id":this.model.attributes.id,"serial_number":""}));
					   i++;
				   }
				//   this.render();				   
			   }
			   if (this.model.get("serial_numbers").length > this.model.get("count")) {
				   var i = 0;
				   var razn = this.model.get("serial_numbers").length-this.model.get("count");
				   while (i < razn) {
					   this.model.get("serial_numbers").pop();
					   i++;
				   }
				//   this.render(this.model.get("serial_numbers"));
			   }
			   }

		   },   

		   deletePosition: function() {
		 	if (order.get("positions").length - order.get('positions').where({"deleted":true}).length <= 1) return alert('Заказ не может быть пустым!');
		 	if(!confirm('Удалить?')) return;
		 	this.model.deleted();
	        this.$el.addClass("deleted");
		   }

		 }); 		

  return OrderPositionView;

});