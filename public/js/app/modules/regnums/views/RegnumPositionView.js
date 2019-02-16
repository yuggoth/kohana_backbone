define([

  // Libs
  'backbone',    
  'text!../templates/regnum-position-template.html',
  'text!../templates/regnum-position-spis-template.html',
  'text!../templates/regnum-position-otkr-template.html'

], function(Backbone,Template,Template1,Template2) {

	 var RegnumPositionView = Backbone.View.extend({
		    tagName:  "tr",
		    
			   template: _.template(Template),		
			   template1: _.template(Template1),				   
			   template2: _.template(Template2),
			   
		   events: {
			   "click .delete_for_uchet" : "deleteForUchet",
			   "click .cancel" : "cancelAction"
		   },

		   initialize: function() {
		     this.model.bind('change', this.render, this);
		     this.model.bind('destroy', this.remove, this);
		   },

		   render: function() {
			   if (this.model.attributes.status == '0') {
			     this.$el.html(this.template(this.model.toJSON()));	
			   } 
			   		if (this.model.attributes.write_off) {
				 this.$el.html(this.template1(this.model.toJSON()));					   
			   } else if (this.model.attributes.deleted) {
				 this.$el.html(this.template2(this.model.toJSON()));				   
			   }
			     return this;
		   },
		   
		   deleteForUchet: function() {
			   if (this.model.get("id")) {
				   var model = this.model;
				   var el = this.$el;
				   $("#confirm_delete").dialog({modal: true});
		
				   
				   if (_.indexOf(roles_data,"regnum_po_edit") !== -1 && this.model.get("ispo") === '1' 
					   || _.indexOf(roles_data,"regnum_pos_edit") !== -1 && this.model.get("ispo") === '0') {
				   
					   $("#confirm_delete").dialog("option", "buttons", {
   						 "Открепить": function() {
 							 model.set({"reason":$(this).find("textarea[name=reason]").val(),"deleted": true});
     						 $( this ).dialog('destroy');
 						 },
 						 "Отмена": function() {
     						 $( this ).dialog('destroy');
     					 }
				        });
				   }

				   if (_.indexOf(roles_data,"regnum_po_spis") !== -1 && this.model.get("ispo") === '1' 
					   || _.indexOf(roles_data,"regnum_pos_spis") !== -1 && this.model.get("ispo") === '0') {
					   $("#confirm_delete").dialog("option", "buttons", {
						   	"Списать": function() {
 							 model.set({"reason":$(this).find("textarea[name=reason]").val(),"write_off": true});
 							 $( this ).dialog('destroy');
						   	},
	 						 "Отмена": function() {
	     						 $( this ).dialog('destroy');
	     					}
					        });
					}	
				   
				   if (_.indexOf(roles_data,"admin") 
					   || _.indexOf(roles_data,"regnum_po_edit") !== -1 && this.model.get("ispo") === '1' && _.indexOf(roles_data,"regnum_po_spis") !== -1 
					   || _.indexOf(roles_data,"regnum_pos_edit") !== -1 && this.model.get("ispo") === '0' && _.indexOf(roles_data,"regnum_pos_spis") !== -1 ) {
					   $("#confirm_delete").dialog("option", "buttons", {
   						 "Открепить": function() {
 							 model.set({"reason":$(this).find("textarea[name=reason]").val(),"deleted": true});
     						 $( this ).dialog('destroy');
 						 },
 						 "Списать": function() {
 							 model.set({"reason":$(this).find("textarea[name=reason]").val(),"write_off": true});
 							 $( this ).dialog('destroy');
 						 },
 						 "Отмена": function() {
 						 $( this ).dialog('destroy');
 						 }
					        });
					}				   
				   
			   } else {
				   
			   if (this.model.get("bu_pos_id")) {
				   if (this.model.get("ispo") === '1') {
					   var model = bu_po.findWhere({"id": this.model.attributes.bu_pos_id});				   
					   } else {
					   var model = bu_pos.findWhere({"id": this.model.attributes.bu_pos_id});
					   }	
			   } else {  
			   if (this.model.get("ispo") === '1') {
				   var model = free_po.findWhere({"id": this.model.attributes.orders_positions_id});				   
				   } else {
				   var model = free_pos.findWhere({"id": this.model.attributes.orders_positions_id});
				   }
				   if (model.get("serial_numbers") && model.get("serial_numbers").length > 0) {
				   model.get("serial_numbers").findWhere({"serial_number":this.model.attributes.serial_number}).set({"changed":false});
				   }
			   }
			   model.set({"count_used": parseInt(model.attributes.count_used)-1});
			   this.model.destroy();
			   }
			   return false;
		   },
		   
		   cancelAction: function() {
			   this.model.set({"deleted":false,"write_off":false,"reason":""});
			   return false;
		   }
		   

		 }); 		

  return RegnumPositionView;

});