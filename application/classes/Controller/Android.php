<?php

class Controller_Android extends Controller_Template {

	public function before()
	{
		parent::before();
		if (!Auth::instance()->logged_in('admin')) {
			HTTP::redirect('/');
		}
	}

	
	public function action_index()
	{
		if (isset($_GET)) {
			if($_GET["serial_number"]) {
				$serial_number = $_GET["serial_number"];
			} else {
				$serial_number = "";				
			}
			if($_GET["person"]) {
				$person = $_GET["person"];
				} else {
				$person = "";
				}
			if($_GET["date"]) {
				$date = $_GET["date"];
				} else {
				$date = "";
				}
				if($_GET["department"]) {
				$department = $_GET["department"];
				} else {
				$department = "";
				}				
			$new_serial_number = ORM::factory("Androidserialnumber")->values(array('serial_number' => $serial_number,'date' => $date, 'person' => $person, 'department' => $department))->create();
			$json["id"] = $new_serial_number->pk();			
			
		}
	}
	
}