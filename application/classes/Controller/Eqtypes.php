<?php

class Controller_Eqtypes extends Controller_Template {

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
		 * Классы оборудования
		 **/
		$content = View::factory('equipment_types');
		$this->template->title = 'Классы оборудования';
		$this->template->content = $content;				
	
	}
	
	public function action_model()
	{
		/**
		 * Классы оборудования
		 **/
		$id = Request::initial()->param('id'); 
		
		$model = ORM::factory('Equipmenttype',$id);
		$json = array();	
			if($model->loaded()){
			
			if(Request::initial()->method() === 'DELETE') {
				$count = DB::query(Database::SELECT, 'select * from orders_positions where equipment_type_id="'.$id.'"')->execute();
				if ($count->count()) {
					exit(false);	
				} else {
					DB::query(Database::DELETE, 'delete from equipment_types where id="'.$id.'"')->execute();
					exit(true);
				}				
			}

			if(Request::initial()->method() === 'PUT') {
				$data = json_decode(Request::initial()->body(),true);
					DB::query(Database::UPDATE, 'update equipment_types set name = "'.$data["name"].'" where id="'.$id.'"')->execute();
					exit(true);
			}

		} else {
			if(Request::initial()->method() === 'POST') {
			$data = json_decode(Request::initial()->body(),true);
			if (!empty($data)) {
				if (isset($data["name"])) {
					$eqtype = ORM::factory("Equipmenttype")->values(array('name' => $data["name"]))->create();
					$json["id"] = $eqtype->pk();
					exit(json_encode($json));			
				}
			}
			}

		}

	}
	
	public function action_collection()
	{
		
		$json = array();
		$types = ORM::factory('Equipmenttype')->find_all()->as_array();
		foreach ($types as $row) {
			$json[] = $row->as_array();
		}
		exit(json_encode($json));

	
	}
}