<?php
class Controller_Po extends Controller_Template {
	
	public function before()
	{
		parent::before();
		if (!Auth::instance()->logged_in()) {
			HTTP::redirect('/');
		}
	}
	
	public function action_getallpo() {
		$json = array();
		$i = 0;
		$equipment = ORM::factory('Registrationnumberposition')->where('ispo','=','1')->find_all()->as_array();
		foreach ($equipment as $row) {
			$json[$i] = $row->as_array();
			$json[$i]["department"] = $row->registrationnumbers->companies->name.' / '.$row->registrationnumbers->departments->name;
			$json[$i]["equipment_type"] = $row->equipmenttypes->name;
			$json[$i]["face"] = $row->registrationnumbers->faces->name;
			$i++;
		}
	
		exit(json_encode($json));
	
	}
	
	public function action_index()
	{
	
		if (Auth::instance()->logged_in('regnum_pos_view_po') || Auth::instance()->logged_in('admin')) {
			/**
			 * Вывод всего ПО
			 **/
	
			$reg_positions = ORM::factory('Registrationnumberposition');
			if (isset($_GET)) {
				if (isset($_GET["equipment_name"]) && !empty($_GET["equipment_name"])) {
					$reg_positions->where('name','like', '%'.$_GET["equipment_name"].'%');
				}
				if (isset($_GET["equipment_type"]) && !empty($_GET["equipment_type"])) {
					$reg_positions->where('equipment_type_id', '=', $_GET["equipment_type"]);
				}
				$reg_positions->where('status','=','0')->where('ispo','=','1');
					
				if (isset($_GET["free_reg_numb"])) { $reg_positions->or_where('status','=','1')->where('ispo','=','1'); 			if (isset($_GET["equipment_type"]) && !empty($_GET["equipment_type"])) { $reg_positions->where('equipment_type_id', '=', $_GET["equipment_type"]); } }
				if (isset($_GET["spis_reg_numb"])) { $reg_positions->or_where('status','=','2')->where('ispo','=','1'); 			if (isset($_GET["equipment_type"]) && !empty($_GET["equipment_type"])) { $reg_positions->where('equipment_type_id', '=', $_GET["equipment_type"]); } }
			}
	
			$reg_positions = $reg_positions->find_all();
			$companies = array (1 => 'ЗАО ПK "Дитэко"', 2 => 'ЗАО СК "Дитэко"', 3 => 'ООО компания "Тандем"');
			$content = View::factory('all_po',array("companies" => $companies, "departments" => ORM::factory('Department')->find_all(),"equipment_types" => ORM::factory('Equipmenttype')->find_all()));
			$content->bind("reg_positions", $reg_positions);
			$this->template->title = 'Оборудование';
			$this->template->content = $content;
		} else {
			HTTP::redirect('/');
		}
	}
	
	public function action_view()
	{
	
		/**
		 * Вывод одного по
		 **/
		if (Auth::instance()->logged_in('regnum_pos_view_po') || Auth::instance()->logged_in('regnum_pos_view') || Auth::instance()->logged_in('admin')) {
			$this->template->title='Оборудование';
			$id = $this->request->param('id');
			$reg_num_pos = ORM::factory('Registrationnumberposition',$id);
	
			if(!$reg_num_pos->loaded() || $reg_num_pos->ispo == '0'){
				throw HTTP_Exception::factory(404,'Нет такой позиции учетной единицы');
			}
			$companies = array (1 => 'ЗАО ПK "Дитэко"', 2 => 'ЗАО СК "Дитэко"', 3 => 'ООО компания "Тандем"');
			$order_positions = ORM::factory('Ordersposition')->where('status', '=', '1')->find_all();
			$content = View::factory('show_reg_number_position',array("companies" => $companies,"departments" => ORM::factory("Department")->find_all()));
			$history = ORM::factory("Registrationnumberpositionlog")->where('registration_number_position_id','=',$id)->order_by('date', 'DESC')->order_by('id', 'DESC')->find_all();
			if (count($history)) {
				$content->set('reg_number_history',$history);
			}
			$content->order_positions = $order_positions;
			$content->bind('reg_num_pos',$reg_num_pos);
			$this->template->content = $content;
		} else {
			HTTP::redirect('/');
		}
	
	}
	
}

?>