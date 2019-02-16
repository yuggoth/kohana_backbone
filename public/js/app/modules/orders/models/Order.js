define([    
  // Libs
  'backbone',    
  'backbone-relational',
  '../models/OrderCompany',
  '../models/OrderPosition',
  '../models/OrderBuhdoc',
  '../collections/OrderPositionList'
  
], function(Backbone,BackboneRelational,OrderCompany,OrderPosition,OrderBuhdoc,OrderPositionList) {

	 var Order = Backbone.RelationalModel.extend({
		    defaults: function() {
		        return {
		          request_date: null,
		          request_number: null,
		          invoice_date:"",
		          invoice_number: "",
		          supplier: "0",
		          new_supplier:"",
		          status: "0",
		          buh_doc: null,
		          company: "1"
		        };
		      },
		      
		      initialize: function() {
		          if (!this.get("request_date")) {
			            this.set({"request_date": this.defaults.request_date});
			          }
		          
		          if (!this.get("request_number")) {
			            this.set({"request_number": this.defaults.request_number});
			          }
		          if (!this.get("invoice_date")) {
			            this.set({"invoice_date": this.defaults.invoice_date});
			          }
		          if (!this.get("invoice_number")) {
			            this.set({"invoice_number": this.defaults.invoice_number});
			          }
		          if (!this.get("supplier")) {
			            this.set({"supplier": this.defaults.supplier});
			          }
		          if (!this.get("new_supplier")) {
			            this.set({"new_supplier": this.defaults.new_supplier});
			          }		          
		          if (!this.get("company")) {
			            this.set({"company": this.defaults.company});
			          }

		        },
		        
		         validate: function(attrs) {
		        	    if ( attrs.invoice_number.length < 1 ) {
		        	    	return 'Номер счета не должен быть пустым';
		       	        }
		        	    if ( attrs.company.length < 1 ) {
		        	    	return 'Не указана компания';
		       	        }
		        	    if ( attrs.invoice_date.length < 1 ) {
		        	    	return 'Не указана дата счета';
		       	        }
		        	    
		        	    if ( attrs.supplier == 0 && attrs.new_supplier.length < 1 ) {
		        	    	return 'Не выбран поставщик';
		       	        }		        	    
		        	 
		         },
		         
				 relations: [
					     		
					     		{
					    	//		autoFetch: true,
					     			type: Backbone.HasOne,
					     			key: 'company',
					     			relatedModel: OrderCompany,
					     	//		includeInJSON: Backbone.Model.prototype.idAttribute,
					     	//		keySource: companies,
					     			reverseRelation: {
					     	//			type: Backbone.HasOne,
					     				key: 'order_id',
					     			}
					     		},					             
					     		{
					     			autoFetch: true,
					     			type: Backbone.HasMany,
					     			key: 'positions',
					     			relatedModel: OrderPosition,
					     			keySource: 'positions',					     			
					     			collectionType: OrderPositionList,
					     			parse:true,
					     			reverseRelation: {
					     				key: 'order_id',
					     			}
					     		},
					     		{
					     			autoFetch: true,
					     			type: Backbone.HasOne,
					     			key: 'buhdoc',
					     			relatedModel: OrderBuhdoc,
					     			keySource: 'buhdoc',
					     			parse:true,
					     			reverseRelation: {
					     				key: 'order_id',
					     			}
					     		}
					     		
					     	],
		         
					     	
	 });

  return Order;

})	