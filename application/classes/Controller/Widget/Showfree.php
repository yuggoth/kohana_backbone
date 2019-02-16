<?php 

class Controller_Widget_Showfree extends Controller_Widget {

	public $template = 'widget/showfree';

	public function action_index()
	{   
	$free_order_positions = ORM::factory('Ordersposition')->where('status', '=', '1')->and_where('ispo','=','0')->find_all();	
	$free_po = ORM::factory('Ordersposition')->where('status', '=', '1')->and_where('ispo','=','1')->find_all();
	$content=View::factory($this->template)->bind('free_order_positions_for_widget',$free_order_positions)->bind('free_po_for_widget',$free_po);
	$this->response->body($content); 
	}	
} 