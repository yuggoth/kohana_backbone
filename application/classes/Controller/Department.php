<?php

class Controller_Department extends Controller_Template {

	public function before()
	{
		parent::before();
		if (!Auth::instance()->logged_in('admin')) {
			HTTP::redirect('/');
		}
	}
	
	public function action_index()
	{ 
		/** 
		 * Главная страница с шаблонами
		 **/
		$content = View::factory('departments');
		$this->template->title = 'Компании';
		$this->template->content = $content;				
	}
	
	public function action_companies()
	{
		/**
		 * Коллекция всех компаний
		 **/
		$json = array();
		$i = 0;		
		$companies = ORM::factory('Company')->find_all();
		foreach($companies as $company) {		
			$json[$i] = $company->as_array();
			 foreach ($company->departments->find_all() as $department) {
			 	$json[$i]['departments'][] = $department->as_array();
			 }
			 $i++;
		}
		exit(json_encode($json));		
	}	
	
	public function action_company()
	{
		/**
		 * Компания
		 **/
		$id = Request::initial()->param('id');
	
		$model = ORM::factory('Company',$id);
		$json = array();
		if($model->loaded()){
				
			if(Request::initial()->method() === 'DELETE') {
				$count = DB::query(Database::SELECT, 'select * from orders where company="'.$id.'"')->execute();
				if ($count->count()) {
					exit(false);
				} else {
					$departments = ORM::factory('Department')->where('company_id', '=',$id)->find_all();
					foreach ($departments as $department) {
						$department->delete();				
					}
					DB::query(Database::DELETE, 'delete from company where id="'.$id.'"')->execute();
					exit(true);
				}
			}
	
			if(Request::initial()->method() === 'PUT') {
				$data = json_decode(Request::initial()->body(),true);
				DB::query(Database::UPDATE, "update company set name = '".$data["name"]."' where id='".$id."'")->execute();
				exit(true);
			}
	
		} else {
			if(Request::initial()->method() === 'POST') {
				$data = json_decode(Request::initial()->body(),true);
				if (!empty($data)) {
					if (isset($data["name"])) {
						$eqtype = ORM::factory("Company")->values(array('name' => $data["name"]))->create();
						$json["id"] = $eqtype->pk();
						exit(json_encode($json));
					}
				}
			}
	
		}
	
	}
	
	
	public function action_model()
	{
		/**
		 * Подразделение
		 **/
		$id = Request::initial()->param('id'); 
		
		$model = ORM::factory('Department',$id);
		$json = array();	
			if($model->loaded()){
			
			if(Request::initial()->method() === 'DELETE') {
				$count = DB::query(Database::SELECT, 'select * from registration_number_log where department="'.$id.'"')->execute();
				if ($count->count()) {
					exit(false);	
				} else {
					DB::query(Database::DELETE, 'delete from department where id="'.$id.'"')->execute();
					exit(true);
				}				
			}

			if(Request::initial()->method() === 'PUT') {
				$data = json_decode(Request::initial()->body(),true);
					DB::query(Database::UPDATE, "update department set name = '".$data["name"]."' where id='".$id."'")->execute();
					exit(true);
			}

		} else {
			if(Request::initial()->method() === 'POST') {
			$data = json_decode(Request::initial()->body(),true);
			if (!empty($data)) {
				if (isset($data["name"]) && isset($data["company"])) {
					$eqtype = ORM::factory("Department")->values(array('name' => $data["name"],'company_id' => $data["company"]))->create();
					$json["id"] = $eqtype->pk();
					exit(json_encode($json));			
				}
			}
			}

		}

	}
}