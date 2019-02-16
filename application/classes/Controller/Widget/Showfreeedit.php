<?php 

class Controller_Widget_Showfreeedit extends Controller_Widget {

	public $template = 'widget/showfree_edit';

	public function action_index()
	{   
	$free_order_positions = ORM::factory('Ordersposition')->where('status', '=', '1')->find_all();
	
	$content=View::factory($this->template)->bind('free_order_positions_for_widget',$free_order_positions);
	$this->response->body($content); 
	}	
} 