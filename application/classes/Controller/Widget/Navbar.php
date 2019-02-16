<?php 
defined('SYSPATH') or die('No direct script access.');
class Controller_Widget_Navbar extends Controller_Widget {

	public $template = 'widget\navbar';

	public function action_index()
	{   

	$this->response->body(View::factory($this->template));
//	$content=View::factory($this->template);
//	$this->response->body($content); 
	}	
} 

?>