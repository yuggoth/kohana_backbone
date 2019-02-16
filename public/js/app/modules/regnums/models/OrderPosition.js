define([

  // Libs
  'backbone-relational',
  '../models/OrderPositionType',
  '../models/OrderPositionPo',
  '../models/OrderPositionSerialNumber',
  '../collections/OrderPositionSerialNumberList',
  '../collections/OrderPositionList'  


], function(BackboneRelational,OrderPositionType,OrderPositionPo,OrderPositionSerialNumber,OrderPositionSerialNumberList,OrderPositionList) {

	 var OrderPosition = Backbone.RelationalModel.extend({
		    defaults: function() {
		        return {
		          name: "",
		          count: "1",
		          summ: "0",
		          equipment_type_id:"1",
		          status: '0',
		          buh_doc: null,
		          prihod: false,
		          deleted: false,
		          undeleted: false,
		          count_used: 0,
		          ispo:'0'
		        }
		      },
		      
		      url: '',
		      
		      initialize: function() {
		          if (!this.get("name")) {
		            this.set({"name": this.defaults.name});
		          }
		          if (!this.get("count")) {
			            this.set({"count": this.defaults.count});
			          }
		          if (!this.get("count_used")) {
			            this.set({"count_used": this.defaults.count_used});
			          }		          
		          
		          if (!this.get("summ")) {
			            this.set({"summ": this.defaults.summ});
			          }
		          if (!this.get("equipment_type_id")) {
			            this.set({"equipment_type_id": this.defaults.equipment_type_id});
			          }
		          if (!this.get("ispo")) {
			            this.set({"ispo": this.defaults.ispo});
			          }	

		        },
		        deleted: function() {
		            this.attributes.deleted = true;
		          },
		          
			     undeleted: function() {
			        this.attributes.undeleted = false;
			     },		          
		          
		          validate: function(attrs) {
		        	if ( attrs.name.length < 1 ) {
		        	    return 'Наименование позиции заказа не должно быть пустым';
		       	    }
		        	if ( attrs.equipment_type_id.length < 1 ) {
		        	    return 'Не определен тип оборудования';
		       	    }		        	
	        	    if ( attrs.count < 1 ) {
	        	    	return 'Количество должно быть больше 0!';
	       	        }
	        	    
		          },
		        		        
		           	 relations: [
					   		{
					     	//		autoFetch: true,
					     			type: Backbone.HasOne,
					     			key: 'equipment_type_id',
					     			relatedModel: OrderPositionType,
					//     			collectionType: OrderPositionTypeList,
					//    			includeInJSON: Backbone.Model.prototype.idAttribute,	
					     //			reverseRelation: {
						 //    			type: Backbone.HasMany,
					     //				key: 'position_id'
					     //			}
					     		}, 
					     		{
							     			type: Backbone.HasOne,
							     			key: 'is_po',
							     			relatedModel: OrderPositionPo,
							     			keySource: 'po',
							    			includeInJSON: Backbone.Model.prototype.idAttribute,	
							     			reverseRelation: {
								     			type: Backbone.HasOne,
							     				key: 'position_id1'
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
						     				key: 'position_id2',
						     	//			includeInJSON: 'id'		
						     			}
						     	 }
					     	]		      
	 });

  return OrderPosition;

})	