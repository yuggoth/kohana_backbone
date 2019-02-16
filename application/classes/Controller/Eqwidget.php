<?php

class Controller_Eqwidget extends Controller {

	public function before()
	{
		parent::before();
		if (!Auth::instance()->logged_in()) {
			HTTP::redirect('/');
		}
	}

	public function action_freeequipment()
	{

	/**
	 * Вывод свободного оборудования при создании/редактировании учетной единицы
	 **/
/*	if (Auth::instance()->logged_in('regnum_pos_edit') || Auth::instance()->logged_in('admin')) {
	$free_order_positions = ORM::factory('Ordersposition')->where('status', '=', '1')->and_where('ispo','=','0')->and_where('isrm','=','0')->and_where(DB::expr('`count` - `count_used`'),'>','0')->find_all();
	$bu_equipment = ORM::factory('Registrationnumberposition')->where('registration_number_id', '=','0')->and_where('status','=','1')->and_where('ispo','=','0')->find_all();
	if ($this->request->post('edit')) { $shab = 'free_equipment_edit'; } else { $shab = 'free_equipment_add'; }
	$content=View::factory("equipment/".$shab,array("free_order_positions_for_widget" => $free_order_positions, "bu_equipment" => $bu_equipment));
	return $this->response->body($content); 
	} */
		$json = array();
		$free_order_positions = ORM::factory('Ordersposition')->where('status', '=', '1')->and_where('isrm','=','0')->and_where(DB::expr('`count` - `count_used`'),'>','0')->find_all();
		$i = 0;
		$ii = 0;				
		foreach ($free_order_positions as $pos) {
			//если это ПО, нужно знать количество лицензий			
			if ($pos->ispo === "1") { 
				$json["po"][$ii] = $pos->as_array();
				$json["po"][$ii]["count_licenses"] = $pos->orderspositionspo->count_licenses;				
				$ii++;
			} else { 
				$json["equipment"][$i] = $pos->as_array();
				if ($pos->serialnumbers) {
					foreach ($pos->serialnumbers->find_all() as $sn) {
						//если серийный номер не занят, брем его
						if ($sn->status == '0') {
						$json["equipment"][$i]["serial_numbers"][] = $sn->as_array();
						}
					}
				}
				$i++;
			}
		}
		
		$free_regnum_positions = ORM::factory('Registrationnumberposition')->where('status', '=', '1')->find_all();
		foreach ($free_regnum_positions as $pos) {
			if ($pos->ispo === "1") {
			$json["bu_po"][] = $pos->as_array();	
		} else {
			$json["bu_equipment"][] = $pos->as_array();			
		}
		}

		exit(json_encode($json));		
	}

	public function action_freepo()
	{

	/**
	 * Вывод свободного ПО при создании/редактировании учетной единицы
	 **/
	/*	if (Auth::instance()->logged_in('regnum_pos_edit_po') || Auth::instance()->logged_in('admin')) {	

	$free_po = ORM::factory('Ordersposition')->where('status', '=', '1')->and_where('ispo','=','1')->and_where('isrm','=','0')->and_where(DB::expr('`count` - `count_used`'),'>','0')->find_all();
	$bu_po = ORM::factory('Registrationnumberposition')->where('registration_number_id', '=','0')->and_where('status','=','1')->and_where('ispo','=','1')->find_all();
	if ($this->request->post('edit')) { $shab = 'free_po_edit'; } else { $shab = 'free_po_add'; }
	$content=View::factory("equipment/".$shab,array("free_po_for_widget" => $free_po, "bu_po" => $bu_po));
	return $this->response->body($content);
		}  */
		$json = array();		
		$bu_equipment = ORM::factory('Registrationnumberposition')->where('registration_number_id', '=','0')->and_where('status','=','1')->find_all();
		foreach ($bu_equipment as $pos) {
			$json[] = $pos->as_array();
		}
			
		exit(json_encode($json));		
	}
	
	public function action_freerm()
	{
		/**
		 * Вывод свободных расходных материалов
		 **/
			$free_rm = ORM::factory('Ordersposition')->where('status', '=', '1')->and_where(DB::expr('`count` - `count_used`'),'>','0')->and_where('isrm','=','1')->find_all();
			$content=View::factory("equipment/free_rm",array("free_rm" => $free_rm));
			return $this->response->body($content);
	
	}
	
	public function action_burm()
	{
		/**
		 * Вывод не свободных расходных материалов
		 **/
		$companies = array (1 => 'ЗАО ПK "Дитэко"', 2 => 'ЗАО СК "Дитэко"', 3 => 'ООО компания "Тандем"');
		$rm = ORM::factory('Expendable');
		if (isset($_GET["name"]) && !empty($_GET["name"])) { $rm->and_where("name", "=", $_GET["name"]); }
		if (isset($_GET["department"]) && !empty($_GET["department"])) { $rm->and_where("department","=",$_GET["department"]); }		
		$pagination = Pagination::factory(array('total_items' => $rm->count_all()));	
		//костыль для путей пагинатора	
		$pagination->setUriSegment('rm');		
		if (isset($_GET["name"]) && !empty($_GET["name"])) { $rm->and_where("name", "=", $_GET["name"]); }
		if (isset($_GET["department"]) && !empty($_GET["department"])) { $rm->and_where("department","=",$_GET["department"]); }
		$rm = $rm->limit($pagination->items_per_page)->offset($pagination->offset)->find_all();		
		$content = View::factory('equipment/bu_rm',array("all_rm" => $rm,"pagination" => $pagination, "companies" => $companies,"departments" => ORM::factory('Department')->find_all()));
		return $this->response->body($content);
	
	}
	
	public function action_showrmconfirm()
	{
		/**
		 * Показать форму для добавления расходных материалов
		 **/
		$companies = array (1 => 'ЗАО ПK "Дитэко"', 2 => 'ЗАО СК "Дитэко"', 3 => 'ООО компания "Тандем"');
		$content=View::factory("equipment/confirm_rm",array("companies" => $companies,"printers" => ORM::factory("Registrationnumberposition")->where('equipment_type_id','=','8')->find_all(),"departments" => ORM::factory("Department")->find_all()));
		return $this->response->body($content);
	
	}

}