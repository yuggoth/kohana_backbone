define([

  '../models/OrderPositionType',
  '../models/OrderPositionPo',
  '../models/OrderPositionWarranty',
  '../models/OrderPositionSerialNumber',
  '../collections/OrderPositionSerialNumberList',
  '../collections/OrderPositionList'

], function(OrderPositionType,OrderPositionPo,OrderPositionWarranty,OrderPositionSerialNumber,OrderPositionSerialNumberList,OrderPositionList) {

	 var OrderPosition = Backbone.RelationalModel.extend({
		    defaults: function() {
		        return {
		          name: "",
		          count: "1",
		          summ: "0",
		          equipment_type_id:"1",
		          status: '0',
		          show_serial_numbers: "false", // показывать ли серийники
		          po_view: "false",  // инпут ПО
		          warranty_view: "false", // инпут Гарантия
		          rm_view: false,    // инпут Расходные материалы
		          buh_doc: null, // бухгалтерские документы
		          prihod: false, // галочки приход 
		          deleted: false // удаленные позиции
		        };
		      },
		      
		      url: '',
		      
		      initialize: function() {
		    	  console.log('OrderPosition initialize');
		          if (!this.get("name")) {
		            this.set({"name": this.defaults.name});
		          }
		          if (!this.get("count")) {
			            this.set({"count": this.defaults.count});
			          }
		          
		          if (!this.get("summ")) {
			            this.set({"summ": this.defaults.summ});
			          }
		          if (!this.get("equipment_type_id")) {
			            this.set({"equipment_type_id": this.defaults.equipment_type_id});
			          }
		          if (!this.get("prihod")) {
			            this.set({"prihod":  this.defaults.prihod});
			          }
		          if (!this.get("warranty_view")) {
			            this.set({"warranty_view": this.defaults.warranty_view});
			          }
		          if (!this.get("po_view")) {
			            this.set({"po_view": this.defaults.po_view});
			          }
		          if (!this.get("show_serial_numbers")) {
			            this.set({"show_serial_numbers": this.defaults.show_serial_numbers});
			          }		          
		          if (!this.get("rm_view")) {
			            this.set({"rm_view": this.defaults.rm_view});
			          }	          

		        },
		        deleted: function() {
		            this.attributes.deleted = true;
		          },
		          
		          validate: function(attrs) {
		        	if ( attrs.name.length < 1 && !attrs.deleted) {
		        	    return 'Наименование позиции заказа не должно быть пустым';
		       	    }
		        	if ( attrs.equipment_type_id.length < 1 && !attrs.deleted) {
		        	    return 'Не определен тип оборудования';
		       	    }		        	
	        	    if ( attrs.count < 1 && !attrs.deleted) {
	        	    	return 'Количество должно быть больше 0!';
	       	        }
	        	    
		          },
		        		        
				 relations: [
					     		{
					     				autofetch: true,
							     		type: Backbone.HasOne,
							     		key: 'is_po',
							     		relatedModel: OrderPositionPo,
							     		keySource: 'po',
							  // 		includeInJSON: Backbone.Model.prototype.idAttribute,	
							     		reverseRelation: {
								     		type: Backbone.HasOne,
							     			key: 'position_id'
							     		}
							     },
						     	 {
							    	 	autofetch: true,
						     			type: Backbone.HasOne,
						     			key: 'is_warranty',
						     			relatedModel: OrderPositionWarranty,
						     			keySource: 'warranty',
						    //			includeInJSON: Backbone.Model.prototype.idAttribute,	
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
						    	//		includeInJSON: Backbone.Model.prototype.idAttribute,	
						     			reverseRelation: {
						     				key: 'position_id'
						     			}
						     	 }
					     	]		      
	 });

  return OrderPosition;

})	