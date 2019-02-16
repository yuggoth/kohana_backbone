<?php defined('SYSPATH') or die('No direct script access.');
 
class Controller_Page extends Controller_Template {
 
    public function action_index()
    {
    	$this->template->title = 'Главная';
		$this->template->content = View::factory('login');
    }    
    
    public function action_lala()
    {
    	$this->template->title = 'lala';
    	$this->template->content = View::factory('login');
    }
 
} 