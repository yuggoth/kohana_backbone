define([

  // Libs
  'backbone-relational',
  '../models/OrderPositionType',
  '../models/OrderPositionPo',
  '../models/OrderPositionWarranty',
  '../models/OrderPositionSerialNumber',
  '../collections/OrderPositionSerialNumberList',
  '../collections/OrderPositionList'

], function(BackboneRelational,OrderPositionType,OrderPositionPo,OrderPositionWarranty,OrderPositionSerialNumber,OrderPositionSerialNumberList,OrderPositionList) {

	 var RegnumPosition = Backbone.RelationalModel.extend({
		    defaults: function() {
		        return {
		          registration_number_id: "",
		          name: "",
		          orders_positions_id: "",
		          equipment_type_id:"1",
		          status: "0",
		          order_id: "",
		          ispo: "0",
		          serial_number: "",
		          deleted: false,
		          write_off: false
		        };
		      },
		      
		      url: '',
		      
		      initialize: function() {
		          if (!this.get("name")) {
		            this.set({"name": this.defaults.name});
		          }
		          if (!this.get("registration_number_id")) {
			            this.set({"registration_number_id": this.defaults.registration_number_id});
			          }
		          
		          if (!this.get("orders_positions_id")) {
			            this.set({"orders_positions_id": this.defaults.orders_positions_id});
			          }
		          if (!this.get("equipment_type_id")) {
			            this.set({"equipment_type_id": this.defaults.equipment_type_id});
			          }
		          if (!this.get("status")) {
			            this.set({"status": this.defaults.status});
			          }
		          if (!this.get("order_id")) {
			            this.set({"order_id": this.defaults.order_id});
			          }
		          if (!this.get("ispo")) {
			            this.set({"ispo": this.defaults.ispo});
			          }
		          if (!this.get("serial_number")) {
			            this.set({"serial_number": this.defaults.serial_number});
			          }
		        },
		        deleted: function() {
		            this.attributes.deleted = true;
		          },
		        		        
				 relations: [
					     		{
					     	//		autoFetch: true,
					     			type: Backbone.HasOne,
					     			key: 'equipment_type_id',
					     			relatedModel: OrderPositionType,
					//     			collectionType: OrderPositionTypeList,
					//    			includeInJSON: Backbone.Model.prototype.idAttribute,	
					     			reverseRelation: {
						     			type: Backbone.HasMany,
					     				key: 'position_id'
					     			}
					     		},
					     		{
							     			type: Backbone.HasOne,
							     			key: 'is_po',
							     			relatedModel: OrderPositionPo,
							     			keySource: 'po',
							    			includeInJSON: Backbone.Model.prototype.idAttribute,	
							     			reverseRelation: {
								     			type: Backbone.HasOne,
							     				key: 'position_id'
							     			}
							     },
						     	 {
						     			type: Backbone.HasOne,
						     			key: 'is_warranty',
						     			relatedModel: OrderPositionWarranty,
						     			keySource: 'warranty',
						    			includeInJSON: Backbone.Model.prototype.idAttribute,	
						     			reverseRelation: {
							     			type: Backbone.HasOne,
						     				key: 'position_id'
						     			}
						     	 },	
						     	 
						     	 {
						     			type: Backbone.HasMany,
						     			key: 'serial_numbers',
						     			relatedModel: OrderPositionSerialNumber,
						     			keySource: 'serial_numbers',
						     			collectionType: OrderPositionSerialNumberList,
						    			includeInJSON: Backbone.Model.prototype.idAttribute,	
						     			reverseRelation: {
						     				key: 'position_id'
						     			}
						     	 }
					     	]		      
	 });

  return RegnumPosition;

})	