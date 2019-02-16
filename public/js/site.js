$(function() {
$( ".datepicker" ).datepicker({dateFormat:'dd.mm.yy',changeMonth: true,changeYear: true});

    
  	                        $("#supplier").autocomplete({
  	                     	    source: "/ajax/ajax?type=1",
    	                          minLength: 3,
  	                    	    select: function(event, ui) {
  	                			$("input[name=supplier]").val(ui.item.id);
  	                     	    }
  	                        });
    
  	                        $("input.table_zakaz_ajax_get").autocomplete({
  	                     	    source: "/ajax/ajax?type=2",
    	                          minLength: 3,
  	                    	    select: function(event, ui) {
  	                     	    }
  	                        });
  	                        
  	                        $("input[name=face]").autocomplete({
  	                     	    source: "/ajax/ajax?type=3",
    	                          minLength: 3,
  	                    	    select: function(event, ui) {
  	  	                		$("input[name=face_id]").val(ui.item.id);
  	                     	    }
  	                        });
    
});

			