define([

  // Libs
  'jqueryUI',
  'backbone',
  '../views/RegnumPositionListView',  
  '../views/OrderCompanyListView',  
  '../views/ErrorView',  
  '../views/SuccessView',    
  'text!../templates/regnum-edit-template.html'

], function(jqueryUI,Backbone, RegnumPositionListView,OrderCompanyListView,ErrorView,SuccessView,Template) {

	 var RegnumEditView = Backbone.View.extend({
		   tagName:  "div",

		   template: _.template(Template),

		   events: {
				"change select" : "changeCompany", 
				"change input:text" : "changeRegnum",
				"submit form" : "saveRegnum"
		   },

		   initialize: function() {
			   this.model.bind('change:face', this.render, this);			   
			   this.model.bind('destroy', this.remove, this);
		   },

		   render: function() {
			//костыль
	//		 this.$el.find(".uchet_cart").remove();  
		     this.$el.html(this.template(this.model.toJSON()));
		     var view = new OrderCompanyListView({"department":this.model.attributes.department});
		     this.$el.find("#company_collection").html(view.render().$el);	     
		     this.$el.find(".datepicker").datepicker({dateFormat:'dd/mm/yy',changeMonth: true,changeYear: true});
             this.$el.find(".regnum_face").autocomplete({
           	    source: "/ajax/ajax?type=3",
                  minLength: 3,
          	    select: function(event, ui) {
          	    	$(".regnum_face_id").val(ui.item.id);
           	    }
           });
		     var view = new RegnumPositionListView({collection:this.model.get("positions")});		     
			 this.$el.find(".uchet_cart").html(view.render().$el);		     
		     return this;
		   },
		   
		   changeCompany: function() {
			 this.model.set({"department":this.$el.find("select optgroup option:selected").val()});
		   },
		   
		   changeRegnum: function() {		   
				 this.model.set({"date":this.$el.find("input.regnum_date").val(),"face":this.$el.find("input.regnum_face").val(),"face_id":this.$el.find("input.regnum_face_id").val()});
		   },		   
		   
		   saveRegnum: function() {
			  var id = this.model.attributes.id;			   
			  this.model.url = "/regnum/view/"+id;
			  this.model.save(null,{
				    success: function(model,response){	
				    	console.local(response);
				    	var view = new SuccessView({model:'Успешно сохранено'});
			    		$("html").append(view.render().$el);
			    		setTimeout(function() { view.$el.fadeOut('slow'); }, 2000);
			    		window.location.href = '#/regnum/view/'+response;
			    		
				    },
				    error: function(model,response){
				    	var view = new ErrorView({model:response.responseText});
				    	$("html").append(view.render().$el);
				    	setTimeout(function() { view.$el.fadeOut('slow'); }, 2000);},
				    	validate:true,
				    	wait:true
			    });

			  return false;  
		   },

		 });

  return RegnumEditView;

});