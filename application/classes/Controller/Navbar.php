<?php
class Controller_Navbar extends Controller {

	public function before()
	{
		parent::before();
		if (!Auth::instance()->logged_in()) {
			HTTP::redirect('/');
		}
	}
	
	public function action_index()
	{
		/**
		 * Навигация
		 **/
	
		//проверяем внешний или внутренний запрос
		if ($this->request->is_initial()) { HTTP::redirect('/'); }
		$roles = array();
		foreach (Auth::instance()->get_user()->roles->find_all() as $role) {
			$roles[] = $role->name;
		}
		return $this->response->body(View::factory('widget/navbar',array("roles" => $roles)));
	}

}

?>