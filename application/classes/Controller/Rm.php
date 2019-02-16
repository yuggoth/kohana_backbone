<?php
class Controller_Rm extends Controller_Template {
	
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
		 * Вывод расходных материалов
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
		$content = View::factory('all_rm',array("all_rm" => $rm,"pagination" => $pagination, "companies" => $companies,"departments" => ORM::factory('Department')->find_all()));
		$this->template->title = 'Расходные материалы';
		$this->template->content = $content;
	}
	
	public function action_add()
	{
		/**
		 * Добавление расходных материалов
		 **/
		if ($_POST) {
			$order_pos = ORM::factory("Ordersposition",$_POST["id"]);
			$department = ORM::factory("Department",$_POST["department"]);
			if ($order_pos->loaded() && $department->loaded()) {
			ORM::factory("Expendable")->values(array("orders_positions_id" => $_POST["id"],"order_id" => $order_pos->order_id,"name" => $order_pos->name,"company" => $department->company_id,"count" => $_POST["count"],"date" => date('Y-m-d', strtotime($_POST["date"])), "department" => $department->id,"registration_number_position_id" => $_POST["printer"]))->save();
			$order_pos->count_used = $order_pos->count_used + $_POST["count"];
			$order_pos->save();
			exit;
		} else {
			// исключение
		}
		}
	}
	
	public function action_spisat()
	{
		/**
		 * Списание расходных материалов
		 **/
		if ($_POST) {
			$rm = ORM::factory("Expendable",$_POST["id"]);
			if ($rm->loaded()) {
				$rm->status = '1';
				if (!empty($_POST["reason"])) {
				$rm->reason = $_POST["reason"];
				}
				if (!empty($_POST["date_spis"])) {
					$rm->date_spis = date('Y-m-d', strtotime($_POST["date_spis"]));
				}
				$rm->save();
				echo "Списано успешно!";
				exit;
			} else {
				// исключение
			}
		}
	}
	
}

?>