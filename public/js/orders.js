$(function () {
	
//-----------Роутер	
	var Controller = Backbone.Router.extend({
	    routes: {
	    	"":                "orders",    // #orders
	        "view/:id":        "view",  // #orders/view/80
	        "add":             "add",  // #orders/add
	    },

	      orders: function() {
	    	  $(".site_block").hide();
	    	  $("#orders-template").slideToggle('middle');
		      orders.fetch();
	      },
	      
	      add: function() {
	    	  if (_.indexOf(roles_data,"order_add") !== -1 || _.indexOf(roles_data,"admin") !== -1) {
	    	  $(".site_block").hide();
	    	  $("#order_buhdoc_container").hide();
	    	  $("#order-edit-template").slideToggle('middle');
		      order.url = "/orders/view/";
		      order.set(order.defaults());
			  order.get("positions").push(new OrderPosition);
		    		var view = new OrderView1({model:order});
			   	    $("#zakaz_form").html(view.render().$el);
	    	  } 	    

	      },
	    
	      view: function(id, page) {
	    	  $(".site_block").hide();
	    	  $("#order-edit-template").slideToggle('middle');
	    	  $("#order_buhdoc_container").show();
	    	  //костыль
	    	  $("div.table_zakaz_position").remove();

	    	  order.url = "/orders/view/"+id;
	    	  order.fetch();
	      }

	});

	
//----------Модели и коллекции	 

	//Модель компании
	 var OrderCompany = Backbone.RelationalModel.extend({
	 });	
	 
	//Коллекция компаний
	 var OrderCompanyList = Backbone.Collection.extend({
	 	  model: OrderCompany,
	 	  url: '/orders/getcompanies'
	 });
	
	//Модель типа оборудования
	 var OrderPositionType = Backbone.RelationalModel.extend({		
	 });
	 
		//Коллекция типов оборудования
	 var OrderPositionTypeList = Backbone.Collection.extend({
	 	  model: OrderPositionType,
	 	  url: '/orders/geteqtypes'
	 });
	 
		//Модель ПО позиции заказа
	 var OrderPositionPo = Backbone.RelationalModel.extend({		
	 });
	 
		//Модель гарантии позиции заказа
	 var OrderPositionWarranty = Backbone.RelationalModel.extend({		
	 });	 
	 
		//Модель серийного номера
	 var OrderPositionSerialNumber = Backbone.RelationalModel.extend({		
	 });
	 
		//Модель бухгалтерских документов
	 var OrderBuhdoc = Backbone.RelationalModel.extend({		
	 });
	 
		//Коллекция серийных номеров
	 var OrderPositionSerialNumberList = Backbone.Collection.extend({
	 	  model: OrderPositionSerialNumber
	 });
	 
	//Модель позиции заказа
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
		          deleted: false
		        };
		      },
		      
		      url: '',
		      
		      initialize: function() {
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
		        },
		        deleted: function() {
		            this.attributes.deleted = true;
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
					    			includeInJSON: Backbone.Model.prototype.idAttribute,	
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
	 

	 
	//Коллекция позиций заказа
	 var OrderPositionList = Backbone.Collection.extend({
		model: OrderPosition,	 
		
	    deleted: function() {
	        return this.filter(function(model){ return model.get('deleted'); });
	    },
	      
		prihod: function() {
		    return this.filter(function(model){ return model.get('prihod'); });
		},  
	 });	  

		
		//Модель заказа
		 var Order = Backbone.RelationalModel.extend({
			    defaults: function() {
			        return {
			          request_date: "",
			          request_number: "",
			          invoice_date:"",
			          invoice_number: "",
			          supplier_id: "0",
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
			          if (!this.get("supplier_id")) {
				            this.set({"supplier_id": this.defaults.supplier_id});
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
		 
			//Коллекция заказов
		 var OrdersList = Backbone.Collection.extend({
		 	model: Order,
		    url: '/orders/getallorders'
		 });	 


		//----------Виды	
			
			//Вид заказа на главной
			 var OrderView = Backbone.View.extend({
			   tagName:  "tr",
			   className: "table_index_tr_no_title_order",

			   template: _.template($('#order-template').html()),

			   events: {

			   },

			   initialize: function() {
			     this.model.bind('change', this.render, this);
			     this.model.bind('destroy', this.remove, this);
			   },

			   render: function() {
			     this.$el.html(this.template(this.model.toJSON()));
			     return this;
			   },

			 });
			 
				//Вид заказа на неглавной
			 var OrderView1 = Backbone.View.extend({
			   tagName:  "div",
			   className: "zakaz_form",

			   template: _.template($('#data-template').html()),

			   events: {
					"change select" : "changeCompany", 
					"blur input:text" : "changeOrder"
			   },

			   initialize: function() {
			     this.model.bind('change', this.render, this);
			     this.model.bind('destroy', this.remove, this);
			   },

			   render: function() {
			     this.$el.html(this.template({model:this.model.toJSON()}));
			     var view = new OrderCompanyListView({model:this.model.get("company")});
			     this.$el.find("#company_collection").html(view.render().$el);
			     this.$el.find(".datepicker").datepicker({dateFormat:'dd/mm/yy',changeMonth: true,changeYear: true});
			     if (this.model.get("buhdoc")) {
			     var view = new OrderBuhdocView({model:this.model.get("buhdoc")});
			     $("#order_buhdoc").html(view.render().$el);
			     }
			     return this;
			   },
			   
			   changeCompany: function() {
				 this.model.set({company:this.$el.find("select :selected").attr("id")});
			   },
			   
			   changeOrder: function() {
				   this.model.set({invoice_number: this.$el.find("input.order_invoice_number").val(),invoice_date: this.$el.find("input.order_invoice_date").val()});
			   }

			 });


			 //Вид позиции заказа
			 var OrderPositionView = OrderView.extend({
			   tagName:  "div",
			 	className: "table_zakaz_position",

			   template: _.template($('#item-template').html()),

			   events: {
				"change select" : "changeEqtype",  				    
			    "click .copy_to_zakaz_table"   : "copyPosition",
			    "click .delete_to_zakaz_table"  : "deletePosition",
			 	"blur input:text": "changePosition",
			 	"click .is_po input": "poPosition",
				"click .is_warranty input": "warrantyPosition",
				"click input.input_prihod": "addToPrihod",
			   },

			   initialize: function() {
			     this.model.bind('change', this.render, this);
			     this.model.bind('destroy', this.remove, this);
			   },

			   render: function() {
			     this.$el.html(this.template({model:this.model.toJSON()}));
			     var view = new OrderPositionTypeListView({model:this.model.get("equipment_type_id")});
			     this.$el.find("span.equipment-collection").html(view.render().$el);
			   	 if (this.model.get("is_po")) {
			   	    this.$el.find(".is_po input").attr("checked",true);
					var view = new OrderPositionPoView({model:this.model.get("is_po")});
					this.$el.append(view.render().$el);
			   	 }
			   	 if (this.model.get("is_warranty")) {
				   	    this.$el.find(".is_warranty input").attr("checked",true);
						var view = new OrderPositionWarrantyView({model:this.model.get("is_warranty")});
						this.$el.append(view.render().$el);
				   	 }
			   	 if (this.model.get("serial_numbers").length === 0) {
				   		this.model.get("serial_numbers").push(new OrderPositionSerialNumber({"orders_positions_id":this.model.attributes.id,"serial_number": ""}));				   		 
				   	 }
			  // 	 console.log(this.model.get("serial_numbers").length);
					var view = new OrderPositionSerialNumberListView({collection:this.model.get("serial_numbers")});
					this.$el.find("span.serial-numbers-collection").append(view.render().$el);
					
			   	if (this.model.get("order_id").get("buhdoc") == null) {
			   		this.$el.find("input.input_prihod").hide();
			   	}
			   	 
			     return this;
			   },
			 	
			   changePosition: function(e) {
			 	this.model.set({"name": this.$("input.position_name").val(),"count": this.$("input.position_count").val(),"summ": this.$("input.position_summ").val(),"count_licenses": this.$("input.position_count_licenses").val(),"sublicensing_contract": this.$("input.position_sublicensing_contract").val(),"unique_license_number": this.$("input.position_unique_license_number").val()}); 
			   },

			   copyPosition: function() {
				   console.log(this.model.clone().attributes);
				   order.get("positions").push(this.model.clone());
				   console.log(this.model.clone());
			   },
			   
			   changeEqtype: function() {
				   this.model.set({equipment_type_id:this.$el.find("select :selected").attr("id")});

			   },
			   
			   poPosition: function() {				   
				   if (!this.model.get("is_po")) {
						var view = new OrderPositionPoView({model:this.model.set({po: new OrderPositionPo({"orders_positions_id":this.model.attributes.id})})});
						console.log(this.model.get("is_po"));	
						   console.log('ПО добавлена');
				   } else {
					   console.log(this.model.attributes);
					   this.$el.find(".is_po_div").remove();
					   this.model.get("is_po").clear();
					   console.log('ПО удалена');
				   }
			   },

			   warrantyPosition: function() {
				   if (!this.model.get("is_warranty")) {
						var view = new OrderPositionWarrantyView({model:this.model.set({warranty: new OrderPositionWarranty({"orders_positions_id":this.model.attributes.id})})});
						console.log(this.model.get("is_warranty"));
						   console.log('гарантия добавлена');
				   } else {
					   console.log('гарантия удалена');
					   this.$el.find(".is_warranty_div").remove();
					   console.log(this.model.get("is_warranty"));
					   this.model.get("is_warranty").clear();
					   console.log(this.model.get("is_warranty"));
				   }

			   },
			   
			   addToPrihod: function() {
				 	this.model.set({"prihod":true}); 
				   },

			   deletePosition: function() {
			 	if (order.get("positions").length - order.get('positions').deleted().length <= 1) return alert('Заказ не может быть пустым!');
			 	if(!confirm('Удалить?')) return;
			 	this.model.deleted();
		        this.$el.addClass("deleted");
			   },

			 }); 	    	

			 //Вид типа оборудования
			 var OrderPositionTypeView = Backbone.View.extend({
			   tagName: "option",
			   className: "",
			   template: _.template($('#type-template').html()),
			   
			   events: {

			   },

			   initialize: function() {
			     this.model.bind('change', this.render, this);
			     this.model.bind('destroy', this.remove, this);
			   },

			   render: function() {
			     this.$el.html(this.template(this.model.toJSON()));
			     return this;
			   },

			 });
			 
			 //Вид компании
			 var OrderCompanyView = Backbone.View.extend({
			   tagName: "option",
			   className: "",
			   template: _.template($('#company-template').html()),

			   events: {
			   },

			   initialize: function() {
				 this.model.bind('change', this.render, this);
			     this.model.bind('destroy', this.remove, this);
			   },

			   render: function() {
			     this.$el.html(this.template(this.model.toJSON()));
			     return this;
			   },

			 });
			 
			 // Вид коллекции типов оборудования
			 var OrderPositionTypeListView = Backbone.View.extend({
					tagName: 'select',
					className: 'position_equipment_type',
					attributes: {
						"style" : "width:200px; margin-left:30px"
					},
				 
			 	template: _.template($("#eqtypes-collection-template").html()),
			  
			     initialize: function() {
			     },
				   
			   render: function() {
			        this.$el.html(this.template()); 
			        eqtypes.forEach(function(model) {
			        	if (this.model.attributes.id === model.attributes.id) {
				            var view = new OrderPositionTypeView({model: model,attributes:{
								"selected" : "selected"
							},id:model.attributes.id});			        		
			        	} else {
			            var view = new OrderPositionTypeView({model: model,id:model.attributes.id});
			        	}
			            this.$el.append(view.render().el);
			            
			        }, this);
				//	  this.$el.html(this.template({eqtypes : this.collection.toJSON()}));
					  return this;
				 },
			  
			 });	
			 
			 // Вид коллекции компаний
			 var OrderCompanyListView = Backbone.View.extend({
				tagName: 'select',
				className: '',
				attributes: {
					"style" : "width:200px",
					"name" : "company"
				},
			 	template: _.template($('#company-collection-template').html()),
			  
			     initialize: function() {
			     },
			  
			     render: function() {
				        this.$el.html(this.template());  			        
				        companies.forEach(function(model) {
				        	if (this.model.attributes.id === model.attributes.id) {
					            var view = new OrderCompanyView({model: model,attributes:{
									"selected" : "selected"
								},id:model.attributes.id});			        		
				        	} else {
				            var view = new OrderCompanyView({model: model,id:model.attributes.id});
				        	}
				            this.$el.append(view.render().el);
				            
				        }, this);
			  
			         return this;
			     },
			  
			 });	
			 
			 //Вид полей для ПО
			 var OrderPositionPoView = Backbone.View.extend({
			   tagName: "div",
			   className: "is_po_div",
			   template: _.template($('#position-is-po').html()),

			   events: {
				   "blur input" : "changePositionPo"
			   },

			   initialize: function() {

			   },

			   render: function() {
			     this.$el.html(this.template({count_licenses:this.model.get("count_licenses"),sublicensing_contract:this.model.get("sublicensing_contract"), unique_license_number: this.model.get(" unique_license_number")}));
			     return this;
			   },
			   
			   changePositionPo: function() {
				 	this.model.set({"count_licenses": this.$("input.position_count_licenses").val(),
				 					"sublicensing_contract": this.$("input.position_sublicensing_contract").val(),
				 					"unique_license_number": this.$("input.position_unique_license_number").val()
				 					}); 				   
			   }

			 });
			 
			 //Вид полей для Гарантии
			 var OrderPositionWarrantyView = Backbone.View.extend({
			   tagName: "div",
			   className: "is_warranty_div",
			   template: _.template($('#position-is-warranty').html()),

			   events: {
				   "blur input" : "changePositionWarranty"
			   },

			   initialize: function() {

			   },

			   render: function() {
			     this.$el.html(this.template({warranty_number:this.model.get("warranty_number"),warranty_date:this.model.get("warranty_date"), warranty_time: this.model.get("warranty_time")}));
			     this.$el.find(".datepicker").datepicker({dateFormat:'dd/mm/yy',changeMonth: true,changeYear: true});
			     return this;
			   },
			   
			   changePositionWarranty: function() {
				 	this.model.set({"warranty_number": this.$("position_warranty_number").val(),
				 					"warranty_time": this.$("input.position_warranty_time").val(),
				 					"warranty_date": this.$("input.position_warranty_date").val(),
				 					});				   
			   }

			 }); 
			 
			 //Вид серийного номера
			 var OrderPositionSerialNumberView = Backbone.View.extend({
			   tagName: "p",
			   className: "",
			   template: _.template($('#serial-number-template').html()),

			   events: {
			   },

			   initialize: function() {
				 this.model.bind('change', this.render, this);
			     this.model.bind('destroy', this.remove, this);
			   },

			   render: function() {
			     this.$el.html(this.template(this.model.toJSON()));
			     return this;
			   },

			 });
			 
			 // Вид коллекции серийных номеров
			 var OrderPositionSerialNumberListView = Backbone.View.extend({
		  
			     initialize: function() {
			     },
			  
			     render: function() {	
				        this.collection.forEach(function(model) {
				            var view = new OrderPositionSerialNumberView({model: model});
				            this.$el.append(view.render().el);
				            
				        }, this);
			  
			         return this;
			     },
			  
			 });	
			 
			 //Вид бухгалтерских документов для заказа
			 var OrderBuhdocView = Backbone.View.extend({
			   tagName: "div",
			   className: "",
			   template: _.template($('#order-buhdoc-template').html()),

			   events: {
				   "blur input" : "changeBuhdoc"
			   },

			   initialize: function() {

			   },

			   render: function() {
				     this.$el.html(this.template(this.model.toJSON()));
				     this.$el.find(".datepicker").datepicker({dateFormat:'dd/mm/yy',changeMonth: true,changeYear: true});
			     return this;
			   },
			   
			   changeBuhdoc: function() {				   
			   }

			 });

			 /*
			 //Вид коллекции позиций заказа
			 var OrderPositionListView = Backbone.View.extend({
			 	el: $('#table_zakaz'),
			  
			     initialize: function() {

			     },
			  
			     render: function() {
			         this.collection.each(function(person) {
			             var personView = new OrderPositionView({model: person});
			             this.$el.append(personView.render().el);
			         }, this);
			  
			         return this;
			     },
			  
			 });
			 
			 */

			 // Вид коллекции заказов
			 var OrdersListView = Backbone.View.extend({
			 	el: $('.table_index'),
			  
			     initialize: function() {
			     },
			  
			     render: function() {
			         this.collection.each(function(person) {
			             var personView = new OrderView({model: Order});
			             this.$el.append(personView.render().el);
			         }, this);
			  
			         return this;
			     },
			  
			 });	
			 
			 // Вид ошибки
			 var ErrorView = Backbone.View.extend({
			 	 tagName: "div",
				 className: "error_view",
				 template: _.template($('#error-view-template').html()),			  
			     initialize: function() {
			     },

			     render: function() {
				     this.$el.html(this.template({model:this.model}));
			         return this;
			     },
			  
			 });
	 
		//----------Приложение	 
		 
			// Вид приложения
			var AppView = Backbone.View.extend({

		    el: $("#content"),

		    events: {
		      "click .add_to_zakaz_table": "addPosition", 
		      "click button.order_save_button" : "submitOrder",
		      "click button.order_prihod_button" : "submitprihodOrder"
		    },

		    initialize: function() {
		    	order
		    	.on('change', function( model, coll ) {
		    		var view = new OrderView1({model:model});
			   	    $("#zakaz_form").html(view.render().$el);
		    	}) 
		    	.on( 'add:positions', function( model, coll ) {
		    		var view = new OrderPositionView({model:model});
			   	    $("#table_zakaz").append(view.render().$el);
		    	})
		    	.on( 'remove:positions', function( model, coll ) {
		    		console.log( 'remove %o', model )
		    	})	
		    	.on('invalid', function(model, error){
		    		var view = new ErrorView({model:error});
		    		$("html").append(view.render().$el);
		    		setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
		    		
		    	});
		    	
		    	order.bind('all',this.render,this);
		    	orders.bind('add', this.addOne, this);
		    	
		    },

			render: function() {

			},

		    addPosition: function(e) {
				order.get("positions").push(new OrderPosition);
		    },
			
			addOne: function(model) {
			    var view = new OrderView({model: model});
		   	    $(".table_index").append(view.render().$el);
		    },

			submitOrder: function(model){
				var i = 0;
				order.get("positions").forEach(function(model){
					var error = model.validate(model.attributes);
					if (error) {
			    		var view = new ErrorView({model:error});
			    		$("html").append(view.render().$el);
			    		setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
			    		i++;
				}
				});
				if (i==0) {
				order.save({validate:true});
				}
				return false;
			},
		    
			submitprihodOrder: function(model){
				if (order.get('positions').prihod().length > 0) {
				var i = 0;
				order.get("positions").forEach(function(model){
					var error = model.validate(model.attributes);
					if (error) {
			    		var view = new ErrorView({model:error});
			    		$("html").append(view.render().$el);
			    		setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
			    		i++;
				}
				});
				if (i==0) {
				order.save({validate:true});
				}

			} else {
				var view = new ErrorView({model:'Необходимо отметить пришедшие позиции галочками'});
	    		$("html").append(view.render().$el);
	    		setTimeout(function() { view.$el.fadeOut('slow'); setTimeout(function() { view.$el.remove();  }, 2000); }, 2000);
			}
				return false;
			}

		  });		 	   
		 
		//-----------Запускаем приложение
			
			//создаем коллекцию заказов для главной
				var orders = new OrdersList;	
			//создаем экземпляр коллекции компаний	
				var companies = new OrderCompanyList(companies_data);	
			//создаем экземпляр коллекции типов позиций	
				var eqtypes = new OrderPositionTypeList(eqtypes_data);	

			//	
				var order = new Order;
			// создаём контроллер-роут	
				var controller = new Controller(); 
			//создаем экземпляр приложения
				var App = new AppView();
			// Запускаем HTML5 History push	
			Backbone.history.start();      		 	 

});