<?php

class Controller_Equipment extends Controller_Template {

	public function before()
	{
		parent::before();
		if (!Auth::instance()->logged_in()) {
			HTTP::redirect('/');
		}
	}
	
	
	public function action_getallequipment() {
		$json = array();
		$i = 0;
		$limit = 10;
		if ($_GET) {
			if ($_GET["page"]) {
				if ($_GET["page"] !== '1') {
					$limit = (10*$_GET["page"]-10).','.$_GET["per_page"];
				}
			}
		}
		
		$equipment = ORM::factory('Registrationnumberposition')->where('ispo','=','0')->where('status','=','0');

		if (isset($_GET["equipment_name"]) && !empty($_GET["equipment_name"])) {
			$equipment->where('name', '=', $_GET["equipment_name"]);
		}
		
		if (isset($_GET["equipment_type"]) && !empty($_GET["equipment_type"])) {
			$equipment->where('equipment_type_id', '=', $_GET["equipment_type"]);
		}
		
		if (isset($_GET["serial_number"]) && !empty($_GET["serial_number"])) {
			$equipment->where('serial_number', '=', $_GET["serial_number"]);
		}		
		
		if (isset($_GET["all_otkr"]) && $_GET["all_otkr"] === "true") {
			$equipment->or_where('status','=','1');	
		} else if (isset($_GET["all_spis"]) && $_GET["all_spis"] === "true") {
			$equipment->or_where('status','=','2');			
		}
		
		if (isset($_GET["equipment_name"]) && !empty($_GET["equipment_name"])) {
			$equipment->where('name', '=', $_GET["equipment_name"]);
		}
		
		if (isset($_GET["equipment_type"]) && !empty($_GET["equipment_type"])) {
			$equipment->where('equipment_type_id', '=', $_GET["equipment_type"]);
		}
		
		if (isset($_GET["serial_number"]) && !empty($_GET["serial_number"])) {
			$equipment->where('serial_number', '=', $_GET["serial_number"]);
		}
		
		if (isset($_GET["all_otkr"]) && $_GET["all_otkr"] === "true") {
			$equipment->or_where('status','=','1');
		} else if (isset($_GET["all_spis"]) && $_GET["all_spis"] === "true") {
			$equipment->or_where('status','=','2');
		}

		if (isset($_GET["equipment_name"]) && !empty($_GET["equipment_name"])) {
			$equipment->where('name', '=', $_GET["equipment_name"]);
		}
		
		if (isset($_GET["equipment_type"]) && !empty($_GET["equipment_type"])) {
			$equipment->where('equipment_type_id', '=', $_GET["equipment_type"]);
		}
		
		if (isset($_GET["serial_number"]) && !empty($_GET["serial_number"])) {
			$equipment->where('serial_number', '=', $_GET["serial_number"]);
		}		
		
		$json["count"] = $equipment->count_all();

		$equipment = ORM::factory('Registrationnumberposition')->where('ispo','=','0')->where('status','=','0');
		
		if (isset($_GET["equipment_name"]) && !empty($_GET["equipment_name"])) {
			$equipment->where('name', '=', $_GET["equipment_name"]);
		}
		
		if (isset($_GET["equipment_type"]) && !empty($_GET["equipment_type"])) {
			$equipment->where('equipment_type_id', '=', $_GET["equipment_type"]);
		}
		
		if (isset($_GET["serial_number"]) && !empty($_GET["serial_number"])) {
			$equipment->where('serial_number', '=', $_GET["serial_number"]);
		}
		
		if (isset($_GET["all_otkr"]) && $_GET["all_otkr"] === "true") {
			$equipment->or_where('status','=','1');
		} else if (isset($_GET["all_spis"]) && $_GET["all_spis"] === "true") {
			$equipment->or_where('status','=','2');
		}
		
		if (isset($_GET["equipment_name"]) && !empty($_GET["equipment_name"])) {
			$equipment->where('name', '=', $_GET["equipment_name"]);
		}
		
		if (isset($_GET["equipment_type"]) && !empty($_GET["equipment_type"])) {
			$equipment->where('equipment_type_id', '=', $_GET["equipment_type"]);
		}
		
		if (isset($_GET["serial_number"]) && !empty($_GET["serial_number"])) {
			$equipment->where('serial_number', '=', $_GET["serial_number"]);
		}
		
		if (isset($_GET["all_otkr"]) && $_GET["all_otkr"] === "true") {
			$equipment->or_where('status','=','1');
		} else if (isset($_GET["all_spis"]) && $_GET["all_spis"] === "true") {
			$equipment->or_where('status','=','2');
		}
		
		if (isset($_GET["equipment_name"]) && !empty($_GET["equipment_name"])) {
			$equipment->where('name', '=', $_GET["equipment_name"]);
		}
		
		if (isset($_GET["equipment_type"]) && !empty($_GET["equipment_type"])) {
			$equipment->where('equipment_type_id', '=', $_GET["equipment_type"]);
		}
		
		if (isset($_GET["serial_number"]) && !empty($_GET["serial_number"])) {
			$equipment->where('serial_number', '=', $_GET["serial_number"]);
		}	

		$equipment = $equipment->limit($limit)->find_all()->as_array();
				
		foreach ($equipment as $row) {
			$json["equipment"][$i] = $row->as_array();
			$json["equipment"][$i]["department"] = $row->registrationnumbers->companies->name.' / '.$row->registrationnumbers->departments->name;			
			$json["equipment"][$i]["equipment_type"] = $row->equipmenttypes->name;	
			$json["equipment"][$i]["face"] = $row->registrationnumbers->faces->name;				
			$i++;
		}		
		

		exit(json_encode($json));
	}	
	
public function action_index()
{

	if (Auth::instance()->logged_in('regnum_pos_view') || Auth::instance()->logged_in('admin')) {
		/**
		 * Вывод всего оборудования
		 **/

		$reg_positions = ORM::factory('Registrationnumberposition');
		if (isset($_GET)) {
			$reg_positions->where('status','=','0')->where('ispo','=','0');
			if (isset($_GET["equipment_name"]) && !empty($_GET["equipment_name"])) {
				$reg_positions->where('name','like', '%'.$_GET["equipment_name"].'%');
			}
			if (isset($_GET["equipment_type"]) && !empty($_GET["equipment_type"])) {
				$reg_positions->where('equipment_type_id', '=', $_GET["equipment_type"]);
			}
			
			if (isset($_GET["equipment_serial_number"]) && !empty($_GET["equipment_serial_number"])) {
				$reg_positions->where('serial_number', '=', $_GET["equipment_serial_number"]);
			}
				
			if (isset($_GET["free_reg_numb"])) { $reg_positions->or_where('status','=','1'); 			if (isset($_GET["equipment_type"]) && !empty($_GET["equipment_type"])) { $reg_positions->where('equipment_type_id', '=', $_GET["equipment_type"]); } }
			if (isset($_GET["spis_reg_numb"])) { $reg_positions->or_where('status','=','2'); 			if (isset($_GET["equipment_type"]) && !empty($_GET["equipment_type"])) { $reg_positions->where('equipment_type_id', '=', $_GET["equipment_type"]); } }
		}

	//	$reg_positions = $reg_positions->find_all();
		$pagination = Pagination::factory(array('total_items' => $reg_positions->count_all(),'uri_segment' => 'equipment'));
		$pagination->setUriSegment('equipment');
		
		if (isset($_GET)) {
			$reg_positions->where('status','=','0')->where('ispo','=','0');
			if (isset($_GET["equipment_name"]) && !empty($_GET["equipment_name"])) {
				$reg_positions->where('name','like', '%'.$_GET["equipment_name"].'%');
			}
			if (isset($_GET["equipment_type"]) && !empty($_GET["equipment_type"])) {
				$reg_positions->where('equipment_type_id', '=', $_GET["equipment_type"]);
			}
				
			if (isset($_GET["equipment_serial_number"]) && !empty($_GET["equipment_serial_number"])) {
				$reg_positions->where('serial_number', '=', $_GET["equipment_serial_number"]);
			}

		
			if (isset($_GET["free_reg_numb"])) { $reg_positions->or_where('status','=','1')->where('ispo','=','0'); 
			if (isset($_GET["equipment_name"]) && !empty($_GET["equipment_name"])) {
				$reg_positions->where('name','like', '%'.$_GET["equipment_name"].'%');
			}
			if (isset($_GET["equipment_type"]) && !empty($_GET["equipment_type"])) {
				$reg_positions->where('equipment_type_id', '=', $_GET["equipment_type"]);
			}
			
			if (isset($_GET["equipment_serial_number"]) && !empty($_GET["equipment_serial_number"])) {
				$reg_positions->where('serial_number', '=', $_GET["equipment_serial_number"]);
			}
			}	
			
			if (isset($_GET["spis_reg_numb"])) { $reg_positions->or_where('status','=','2')->where('ispo','=','0');
			if (isset($_GET["equipment_name"]) && !empty($_GET["equipment_name"])) {
				$reg_positions->where('name','like', '%'.$_GET["equipment_name"].'%');
			}
			if (isset($_GET["equipment_type"]) && !empty($_GET["equipment_type"])) {
				$reg_positions->where('equipment_type_id', '=', $_GET["equipment_type"]);
			}
			
			if (isset($_GET["equipment_serial_number"]) && !empty($_GET["equipment_serial_number"])) {
				$reg_positions->where('serial_number', '=', $_GET["equipment_serial_number"]);
			}
			 }		
			
		}
		$companies = array (1 => 'ЗАО ПK "Дитэко"', 2 => 'ЗАО СК "Дитэко"', 3 => 'ООО компания "Тандем"');
		$content = View::factory('all_equipment',array("companies" => $companies, "departments" => ORM::factory('Department')->find_all(),"equipment_types" => ORM::factory('Equipmenttype')->find_all(),'pagination' => $pagination,'reg_positions' => $reg_positions->limit($pagination->items_per_page)->offset($pagination->offset)->find_all()));
		$this->template->title = 'Оборудование';
		$this->template->content = $content;
	} else {
		HTTP::redirect('/');
	}
}

public function action_view()
{

	/**
	 * Вывод одного оборудования
	 **/
	if (Auth::instance()->logged_in('regnum_pos_view_po') || Auth::instance()->logged_in('regnum_pos_view') || Auth::instance()->logged_in('admin')) {
		
		$id = $this->request->param('id');
		$reg_num_pos = ORM::factory('Registrationnumberposition',$id);

		if(!$reg_num_pos->loaded() || $reg_num_pos->ispo == '1'){
			exit(HTTP_Exception::factory(404,'Нет такого обрудования'));
		}
		$json = array();
		$json["id"] = $reg_num_pos->id;
		$json["name"] = $reg_num_pos->name;
		$json["equipment_type"] = $reg_num_pos->equipmenttypes->name;
		$json["serial_number"] = $reg_num_pos->serial_number;
		$json["order_id"] = $reg_num_pos->order_id;
		$json["ispo"] = $reg_num_pos->ispo;
		$json["status"] = $reg_num_pos->status;	
		$json["registration_number_id"] = $reg_num_pos->registration_number_id;
		exit(json_encode($json));
	} else {
		exit(HTTP_Exception::factory(403,'Недостаточно прав'));		
	}

}

}

?>