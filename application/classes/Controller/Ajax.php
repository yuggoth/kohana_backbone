<?php

class Controller_Ajax extends Controller {

	public function before()
	{
		parent::before();
		if (!Auth::instance()->logged_in()) {
			HTTP::redirect('/');
		}
	}
	
	public function action_ajax()
	{
		/**
		 * Ajax-подгрузка тел в поле ввода
		 **/
		if (Auth::instance()->logged_in()) {
			$return = array();
			if ($_GET["term"]) {
	
				switch ($_GET["type"]) {
					case "1": $table = 'suppliers'; break;
					case "2": $table = 'orders_positions'; break;
					case "3": $table = 'department_face'; break;
					default: die();
				}
				DB::query(NULL, "SET CHARACTER SET utf8")->execute();
				$query = "select * from ".$table." where name like '%".$_GET["term"]."%' group by `name`";
				$records = DB::query(Database::SELECT, $query)->execute();
				foreach($records as $row) {
					array_push($return,array('value'=> $row["name"], 'id' => $row["id"]));
				}
			}
			echo json_encode($return);
			exit;
		} else {
			HTTP::redirect('/');
		}
	}
	
	public function action_getchilds()
	{
		/**
		 * Ajax-подгрузка отделов
		 **/
		if (Auth::instance()->logged_in()) {
			if ($_POST) {
				$return = '';
				switch ($_POST["type"]) {
					case "departments":
						$records = DB::query(Database::SELECT, "select * from department where company_id = '".$_POST["parent"]."'")->execute();
						foreach($record as $row) {
							$return = $return."<option value='".$row["id"]."'>".$row["name"]."</option>";
						}
						break;
					default: die();
				}
			}
			echo $return;
			exit;
		} else {
			HTTP::redirect('/');
		}
	}
	
	public function action_getprinters()
	{
		/**
		 * Ajax-подгрузка принтеров для формы учета расходных материалов
		 **/
		if (Auth::instance()->logged_in()) {
			if ($_POST) {
				$return = "<option value='0'>- не выбрано -</option>";
				if ($_POST["department"]) {
						$records = DB::query(Database::SELECT, "select * from registration_number_position,registration_number where registration_number.id = registration_number_position.registration_number_id && registration_number_position.equipment_type_id = '8' && registration_number.department = '".$_POST["department"]."'")->execute();
						foreach($records as $row) {
							$return = $return."<option value='".$row["id"]."'>".$row["name"]."</option>";
						}
			}
			echo $return;
			exit;
		} else {
			HTTP::redirect('/');
		}
	}
	}

}

?>