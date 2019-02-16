<?php
class Controller_Orders extends Controller_Template {


	/* 
	* Статусы заказов и позиций заказов:				0 - не пришел
	* 													1 - пришел
	* Статусы учетных единиц и их позиций: 				0 - в пользовании
	* 													1 - не в пользовании
	* 													2 - списан
	* Статусы сотрудников:								0 - работает
	* 													1 - не работает (уволен и т.д.)
	* История изменения позиций учетных единиц:			0 - прикреплена
	* 													1 - откреплена
	* 													2 - списана
	* 													3 - не тронуто
	*
	*
	*
	*/
	

	public function action_index() {
		/**
		 * Вывод всех заказов
		 **/
		if (Auth::instance()->logged_in('admin') || Auth::instance()->logged_in('order_view')) {	
			if (isset($_GET)) {
				$page_orders=ORM::factory('Orders');
				if (isset($_GET["invoice_number"]) && !empty($_GET["invoice_number"])) { $page_orders->where('invoice_number', '=', $_GET["invoice_number"]);  }
				if (isset($_GET["invoice_date"]) && !empty($_GET["invoice_date"])) { $page_orders->where('invoice_date', '=', date('Y-m-d', strtotime($_GET["invoice_date"])));  }
				if (!isset($_GET["all_orders"])) { $page_orders->where('status','=','0'); }
				$pagination = Pagination::factory(array('total_items' => $page_orders->count_all()));
				$pagination->setUriSegment('orders');
				if (isset($_GET["invoice_number"]) && !empty($_GET["invoice_number"])) { $page_orders->where('invoice_number', '=', $_GET["invoice_number"]); }
				if (isset($_GET["invoice_date"]) && !empty($_GET["invoice_date"])) { $page_orders->where('invoice_date', '=', date('Y-m-d', strtotime($_GET["invoice_date"]))); }
				if (!isset($_GET["all_orders"])) { $page_orders->where('status','=','0'); }
				$orders = $page_orders->order_by('invoice_date','DESC')->limit($pagination->items_per_page)->offset($pagination->offset)->find_all();
			}
			
			$eqtypes = array();
			foreach (ORM::factory('Equipmenttype')->find_all() as $row) {
				$eqtypes[]= $row->as_array();
			}
			
			$companies = array();
			foreach (ORM::factory('Company')->find_all() as $row) {
				$companies[]= $row->as_array();
			}
			
			$all_roles = array();
			foreach (ORM::factory('Role')->find_all() as $role) {
				$all_roles[]= $role->as_array();
			}			
			
			$roles = array();
			foreach (Auth::instance()->get_user()->roles->find_all() as $role) {
				$roles[]= $role->name;
			}
			
			$departments = array();
			$i = 0;
			foreach (ORM::factory('Company')->find_all() as $company) {
				$departments[$i] = $company->as_array();
				foreach($company->departments->find_all() as $department) {
					$departments[$i]["departments"][] = $department->as_array();
				}
				$i++;
			}		

			$this->template->title = 'Заказы';
			$this->template->content = View::factory('all_orders',array("all_roles" => $all_roles,"roles" => $roles, "eqtypes" => $eqtypes,"companies" => $companies,"departments" => $departments));
	
		} else {
		$this->template->content = View::factory('login');
		} 
	}

	
	public function action_getallorders() {
		$json = array();
		$limit = 10;
		if ($_GET) {
			if ($_GET["page"]) {
				if ($_GET["page"] !== '1') {
				$limit = (10*$_GET["page"]-10).','.$_GET["per_page"];
				}
			}
		}
		

		
		$orders = ORM::factory('Orders');
	//	$orders->search($_GET);
		$orders->where('status','=','0');
		
		if (isset($_GET["invoice_number"]) && !empty($_GET["invoice_number"])) {
			$orders->where('invoice_number', '=', $_GET["invoice_number"]);
		}
		
		if (isset($_GET["invoice_date"]) && !empty($_GET["invoice_date"])) {
			$orders->where('invoice_date', '=', date('Y-d-m', strtotime($_GET["invoice_date"])));
		}
		
		if (isset($_GET["all_orders"]) && $_GET["all_orders"] === "true") {
			$orders->or_where('status','=','1');
				
			if (isset($_GET["invoice_number"]) && !empty($_GET["invoice_number"])) {
				$orders->where('invoice_number', '=', $_GET["invoice_number"]);
			}
				
			if (isset($_GET["invoice_date"]) && !empty($_GET["invoice_date"])) {
				$orders->where('invoice_date', '=', date('Y-d-m', strtotime($_GET["invoice_date"])));
			}
		}
		

		$json["count"] = $orders->count_all();		
		
		$orders = ORM::factory('Orders')->where('status','=','0');
		
		if (isset($_GET["invoice_number"]) && !empty($_GET["invoice_number"])) {
			$orders->where('invoice_number', '=', $_GET["invoice_number"]);
		}
		
		if (isset($_GET["invoice_date"]) && !empty($_GET["invoice_date"])) {
			$orders->where('invoice_date', '=', date('Y-d-m', strtotime($_GET["invoice_date"])));
		}

		if (isset($_GET["all_orders"]) && $_GET["all_orders"] === "true") {
			$orders->or_where('status','=','1');
			
			if (isset($_GET["invoice_number"]) && !empty($_GET["invoice_number"])) {
				$orders->where('invoice_number', '=', $_GET["invoice_number"]);
			}
			
			if (isset($_GET["invoice_date"]) && !empty($_GET["invoice_date"])) {
				$orders->where('invoice_date', '=', date('Y-d-m', strtotime($_GET["invoice_date"])));
			}			
		}
		
		$orders = $orders->order_by('invoice_date', 'DESC')->limit($limit)->find_all()->as_array();
	
		$i = 0;
			foreach ($orders as $order) {
		$json["orders"][$i] = $order->as_array();
		$json["orders"][$i]["supplier_id"] = $order->suppliers->name;
		$json["orders"][$i]["company"] = $order->companies->name;
		$json["orders"][$i]["invoice_date"] = date('d.m.Y', strtotime($order->invoice_date));
		if ($json["orders"][$i]["request_date"]) {
			$json["orders"][$i]["request_date"] = date('d.m.Y', strtotime($order->request_date));
		} else {
			unset($json["orders"][$i]["request_date"]);			
		}
		$i++;
			}
		exit(json_encode($json));
	}
	
	public function action_geteqtypes() {
	$json = array();	
	$eq_types = ORM::factory('Equipmenttype')->find_all();
	foreach ($eq_types as $row) {
		$json[]= $row->as_array();
	}
	exit(json_encode($json));
	}
	
	public function action_getcompanies() {
		$json = array();
		$companies = ORM::factory('Company')->find_all();
		foreach ($companies as $row) {
			$json[]= $row->as_array();
		}
		exit(json_encode($json));
	}
		
	public function action_view(){
		/**
		 * Просмотр / редактирование одного заказа
		 **/
		if (Auth::instance()->logged_in('admin') || Auth::instance()->logged_in('order_edit') || Auth::instance()->logged_in('order_view')) {
			$id = $this->request->param('id');
			$order = ORM::factory('Orders',$id);
			if (!$order->loaded()) { exit(HTTP_Exception::factory(404,'Нет такого заказа')); }
			//---------- РЕДАКТИРОВАНИЕ ЗАКАЗА --------------
			if (Request::initial()->method() === 'PUT') {
				$data = json_decode(Request::initial()->body(),true);
							$error = new ORM_Validation_Exception('', Validation::factory(array()));
				//обновим сам заказ		

				//сначала необязательные параметры
				if (isset($data["request_date"]) && strlen($data["request_date"]) > 0) {
					$order->set("request_date", date('Y-m-d', strtotime(str_replace('/', '-',$data["request_date"])))); 
				} else {
					$order->set("request_date",null);
				}
				
				if (isset($data["request_number"]) && strlen($data["request_number"]) > 0) {
					$order->set("request_number", $data["request_number"]);					
				} else {
					$order->set("request_number",null);
				}
				
				//потом обязательные
				$order->values(array('company' => $data["company"]["id"], 'invoice_date' => date('Y-m-d', strtotime(str_replace('/', '-',$data["invoice_date"]))), 'invoice_number' => $data["invoice_number"]));
				
				 try
				  {
				  $order->check();
				  if (($data["supplier"] == '0') && (empty($data["new_supplier"]))) {
				  	$error1 = 'Не выбрали поставщика';
				  }
				  }
				  catch(ORM_Validation_Exception $e)
				  {
				  	$error->merge($e);
				  }
				  $order->save();
				  $orderpos = ORM::factory('Ordersposition');

				  //работа с бухгалтерскими документами
				  if (isset($data["buhdoc"])) {
				  	$buhdoc = ORM::factory('Buhdoc');
				  	$buhdoc->set("date", date('Y-m-d', strtotime(str_replace('/', '-',$data["buhdoc"]["date"]))));
				  	$buhdoc->set("date_platej_document", date('Y-m-d', strtotime(str_replace('/', '-',$data["buhdoc"]["date_platej_document"]))));
				  	$buhdoc->set("number_platej_document", $data["buhdoc"]["number_platej_document"]);
				  	$buhdoc->set("sales_invoice", $data["buhdoc"]["sales_invoice"]);
				  	$buhdoc->set("invoice", $data["buhdoc"]["invoice"]);
				  	$buhdoc->save();
				  	$order = ORM::factory('Orders',$id);
				  	$order->buh_doc = $buhdoc->id;
				  	$order->status = '1';
				  	$order->save();
				  }
				  	//работа с позициями заказа
					if (isset($data['positions'])) {
						foreach($data['positions'] as $pos) {
							//обновляем старые не удаленные
							if (isset($pos["id"]) && !($pos["deleted"])) {
								$orderpos = ORM::factory('Ordersposition',$pos["id"]);
								$orderpos->values(array('name' => $pos['name'], 'count' => $pos['count'], 'summ' => $pos['summ'], 'equipment_type_id' => $pos['equipment_type_id']));
								if ($pos["prihod"]) {
									$orderpos->buh_doc = $buhdoc->id;
								}
								try
								{
									$orderpos->check();
								}
								catch(ORM_Validation_Exception $e)
								{
									$error->merge($e);
								}
								$orderpos->update();							
							}
							//удаляем старые удаленные
							if (isset($pos["id"]) && $pos["deleted"]) {
								$orderpos = ORM::factory('Ordersposition',$pos["id"]);
								$orderpos->delete();	
							}							
							//добавляем новые	
							if (!isset($pos["id"]) && !($pos["deleted"])) {
								$orderpos = ORM::factory('Ordersposition');
								$orderpos->values(array('name' => $pos["name"], 'count' => $pos["count"], 'summ' => $pos["summ"], 'equipment_type_id' => $pos["equipment_type_id"],'order_id' => $order->id));
								if ($pos["prihod"]) {
									$orderpos->buh_doc = $buhdoc->id;
								}								
								$orderpos->save();									
							}							
						}

					exit(json_encode($order->id));
			}
			}

			//---------- ВЫВОД ЗАКАЗА --------------			
		$json = array();
		$orders = ORM::factory('Orders',$id);
			$json["id"] = $orders->id;
			$json["invoice_number"] = $orders->invoice_number;
			$json["request_number"] = $orders->request_number;
			$json["company"] = $orders->company;
			if ($orders->invoice_date) {
			$json["invoice_date"] = date("d/m/Y", strtotime($orders->invoice_date));
			}
			if ($orders->request_date) {			
			$json["request_date"] = date("d/m/Y", strtotime($orders->request_date));
			}			
			$json["supplier"] = $order->supplier_id;
			$json["new_supplier"] = $order->suppliers->name;			
			$json["buhdoc"] = $order->buhdoc->as_array();
			if ($order->buhdoc->date) {
			$json["buhdoc"]["date"] = date("d/m/Y", strtotime($order->buhdoc->date));
			}
			if ($order->buhdoc->date_platej_document) {
			$json["buhdoc"]["date_platej_document"] = date("d/m/Y", strtotime($order->buhdoc->date_platej_document));			
			}
			$i = 0;

			foreach ($orders->orderspositions->find_all() as $row1) {
				$json["positions"][$i] = $row1->as_array();
				if($row1->orderspositionspo->count_licenses) {
					$json["positions"][$i]["po"] = $row1->orderspositionspo->as_array();
				}
				if($row1->warranty->warranty_number) {
					$json["positions"][$i]["warranty"] = $row1->warranty->as_array();
				}
					if (count($row1->serialnumbers->find_all())) {
					foreach ($row1->serialnumbers->find_all() as $sn) {
					$json["positions"][$i]["serial_numbers"][] = $sn->as_array();
						}
					}
					
					if($row1->buhdoc) {
						$json["positions"][$i]["buhdoc"] = $row1->buhdoc->as_array();
						$json["positions"][$i]["buhdoc"]["date"] = date("d/m/Y", strtotime($row1->buhdoc->date));
						$json["positions"][$i]["buhdoc"]["date_platej_document"] = date("d/m/Y", strtotime($row1->buhdoc->date_platej_document));
					}	
				$i++;
			} 
		
		exit(json_encode($json));
	}
	}
	
	
	public function action_prih()
	{
		/**
		 * Приход заказа
		 **/

	
		if (Auth::instance()->logged_in('admin') || Auth::instance()->logged_in('order_buh_doc')) {
			$this->template->title='Заказ';
			$id = $this->request->param('id');
			$order = ORM::factory('Orders',$id);
	
			if(!$order->loaded()){
				throw HTTP_Exception::factory(404,'Нет такого заказа');
			}
	
			if (isset($_POST["prihod_submit"])) {

				if (isset($_POST['table_zakaz']['prihod']) && count($_POST['table_zakaz']['prihod'])) {
				$error = new ORM_Validation_Exception('', Validation::factory(array()));
				$buhdoc = ORM::factory('Buhdoc')->values(array('date' => date('Y-m-d', strtotime($_POST["date"])),'invoice' => $_POST["invoice"], 'sales_invoice' => $_POST["sales_invoice"], 'number_platej_document' => $_POST["number_platej_document"], 'date_platej_document' => date('Y-m-d', strtotime($_POST["date_platej_document"]))));
				 foreach ($_POST['table_zakaz']['prihod'] as $prih => $value) {
				 	if (isset($_POST['table_zakaz'][$value]['is_po'])) {
				 		$orderspositionspo = ORM::factory('Orderspositionspo');
				 		$orderspositionspo->orders_positions_id = $value;
				 		$orderspositionspo->values($_POST['table_zakaz'][$value], array('count_licenses','sublicensing_contract','unique_license_number'));
				 		try
				 		{
				 			$orderspositionspo->check();
				 		}
				 		catch(ORM_Validation_Exception $e)
				 		{
				 			$error->merge($e);
				 		}
				 	}	
				 	if (isset($_POST['table_zakaz'][$value]['is_warranty'])) {
				 		$orderspositionswarranty = ORM::factory('Orderspositionswarranty');
				 		$orderspositionswarranty->orders_positions_id = $value;
				 		$orderspositionswarranty->values($_POST['table_zakaz'][$value], array('warranty_number','warranty_date','warranty_time'));
				 		try
				 		{
				 			$orderspositionswarranty->check();
				 		}
				 		catch(ORM_Validation_Exception $e)
				 		{
				 			$error->merge($e);
				 		}
				 	}

				 	if (in_array('',$_POST['table_zakaz'][$value]['serial_number'])) { 
				 		$i = 0;
				 		foreach ($_POST['table_zakaz'][$value]['serial_number'] as $s) {
				 			if ($s === '') {
				 				$i++;
				 			}
				 		}
				 		if ($_POST['table_zakaz'][$value]['count'] == $i) {	   
				 		} else {
				 			$this->error1 = 'Необходимо заполнить все серийники';				 			
				 		}
				 	}
				 	
				 }	
				try
				{
					$buhdoc->check();
				}
				catch(ORM_Validation_Exception $e)
				{
					$error->merge($e);
				}
				
				$errors = $error->errors();
				if(!$errors)
				{
					$buhdoc->save();
					$buhdoc_id = $buhdoc->pk();
					foreach ($order->orderspositions->find_all() as $position) {
						foreach ($_POST['table_zakaz']['prihod'] as $prih => $value) {
							if ($position->id == $value) {
								$id = $position->id;
								$position->status = 1;
								$position->buh_doc = $buhdoc_id;
								if ($position->equipment_type_id == '7') { $position->isrm = '1'; }
								if (!empty($_POST['table_zakaz'][$id]['count_licenses'])) {
									$position->ispo = 1;
									$position->orderspositionspo->orders_positions_id = $position->id;
									$position->orderspositionspo->count_licenses=$_POST['table_zakaz'][$id]['count_licenses'];
									$position->orderspositionspo->sublicensing_contract=$_POST['table_zakaz'][$id]['sublicensing_contract'];
									$position->orderspositionspo->unique_license_number=$_POST['table_zakaz'][$id]['unique_license_number'];
									$position->orderspositionspo->save();
								}					
								if (!empty($_POST['table_zakaz'][$id]['warranty_number'])) {
									$position->warranty->orders_positions_id = $position->id;
									$position->warranty->warranty_number=$_POST['table_zakaz'][$id]['warranty_number'];
									$position->warranty->warranty_date=date('Y-m-d', strtotime($_POST['table_zakaz'][$id]['warranty_date']));
									$position->warranty->warranty_time=$_POST['table_zakaz'][$id]['warranty_time'];
									$position->warranty->save();
								}
								$position->save();
								if (!in_array('',$_POST['table_zakaz'][$id]['serial_number'])) {
									foreach ($_POST['table_zakaz'][$id]['serial_number'] as $ser_num) {
										$serial_number = ORM::factory('Orderspositionsserialnumber');
										$serial_number->orders_positions_id = $position->id;
										$serial_number->serial_number = $ser_num;
										$serial_number->save();
										$position->serial_number = $_POST['table_zakaz'][$id]['serial_number'];
									}
								}
							}
						}
					}
					
					if (count($_POST['table_zakaz']['order_pos']) === count($_POST['table_zakaz']['prihod'])) {
						$order->status = 1;
						$order->buh_doc = $buhdoc_id;
						$order->save();
					}
					HTTP::redirect('/orders/');					
					
				}
				
				} else {
					$this->error1 = 'Необходимо отметить пришедшие позиции заказа галочками';					
				}
			}

			$companies = array (1 => 'ЗАО ПK "Дитэко"', 2 => 'ЗАО СК "Дитэко"', 3 => 'ООО компания "Тандем"');
			if ($order->status == '0') { $shab = 'vieworder_prihod'; } else { $shab = 'vieworder_no_edit'; }
			$content = View::factory($shab, array("companies" => $companies, "equipment_types" => ORM::factory('Equipmenttype')->find_all(), "suppliers" => $order->suppliers, "orders_positions" => $order->orderspositions->find_all()));
			if (isset($errors)) {
				$content->bind("error",$errors);
			}
			if (isset($this->error1)) {
				$content->bind("error1",$this->error1);
			}	
			$content->bind('order',$order);
			$this->template->content = $content;
		}
	}
	
	public function action_add()
	{
		/**
		 * Добавление заказа
		 **/
		if (Auth::instance()->logged_in('admin') || Auth::instance()->logged_in('order_add')) {

			//---------- ДОБАВЛЕНИЕ ЗАКАЗА --------------
			if (Request::initial()->method() === 'POST') {
				//получим данные POST-запроса
				$data = json_decode(Request::initial()->body(),true);
				$order = ORM::factory('Orders');
				$error = new ORM_Validation_Exception('', Validation::factory(array()));
				//загрузим данные в модель
				//сначала необязательные параметры
				if (isset($data["request_date"])) {
					$order->set("request_date", date('Y-m-d', strtotime(str_replace('/', '-',$data["request_date"])))); 
				}
				
				if (isset($data["request_number"])) {
					$order->set("request_number", $data["request_number"]);					
				}
				
				//потом обязательные
				$order->values(array('company' => $data["company"]["id"], 'invoice_date' => date('Y-m-d', strtotime(str_replace('/', '-',$data["invoice_date"]))), 'invoice_number' => $data["invoice_number"]));
				//проверяем
				try
				{
					$order->check();
					if (($data["supplier"] == '0') && (empty($data["new_supplier"]))) {
						$error1 = 'Не выбрали поставщика';	
					}				
				}
				catch(ORM_Validation_Exception $e)
				{
					$error->merge($e);
				}
				//работа с позициями заказа
				if (isset($data['positions'])) {
			
					foreach($data['positions'] as $pos) {
						$orderpos = ORM::factory('Ordersposition');
						$orderpos->name = $pos["name"];
						$orderpos->equipment_type_id = $pos["equipment_type_id"];
						$orderpos->count = $pos["count"];
						$orderpos->summ = $pos["summ"];
						try
						{
							$orderpos->check();
						}
						catch(ORM_Validation_Exception $e)
						{
							$error->merge($e);
						}
						
						if (isset($pos["serial_numbers"])) {
							foreach($pos["serial_numbers"] as $sn) {
						$orderpossn = ORM::factory('Orderspositionsserialnumber');
						$orderpossn->serial_number = $sn["serial_number"];
						try{
							$orderpossn->check();
						}
						catch(ORM_Validation_Exception $e) {
							$error->merge($e);
						}
							}
						}
						
						
						if (isset($pos["po_view"]) && $pos["po_view"] === "true") {
								$orderpos->orderspositionspo->count_licenses=$pos['po']['count_licenses'];
								$orderpos->orderspositionspo->sublicensing_contract=$pos['po']['sublicensing_contract'];
								$orderpos->orderspositionspo->unique_license_number=$pos['po']['unique_license_number'];
								try{
									$orderpos->orderspositionspo->check();
								}
								catch(ORM_Validation_Exception $e) {
									$error->merge($e);
								}
						}
						
						if (isset($pos["warranty_view"]) && $pos["warranty_view"] === "true") {
								$orderpos->warranty->warranty_number=$pos['warranty']['warranty_number'];
								$orderpos->warranty->warranty_date=date('Y-m-d', strtotime($pos['warranty']['warranty_date']));
								$orderpos->warranty->warranty_time=$pos['warranty']['warranty_time'];
							try{
								$orderpos->warranty->check();
							}
							catch(ORM_Validation_Exception $e) {
								$error->merge($e);
							}
						}
					}
				}

				$errors = $error->errors();
				
				if (! $errors && !isset($error1)) {
				
					if ($data['supplier'] == 0) {
						$result = DB::query(Database::SELECT, "SELECT id from suppliers where lower(name) = '".strtolower($data['new_supplier'])."'")->execute();
						if ($result->count()) {
							$order->supplier_id = $result->get('id');
						} else {
							$supplier = ORM::factory('Supplier');
							$supplier->name = $_POST['new_supplier'];
							$supplier->save();
							$order->supplier_id=$supplier->pk();
						}
					} else {
						$order->supplier_id=$data['supplier'];
					}
				
					$order->save();
					$last_id = $order->pk();
					if (isset($data['positions'])) {
						$order_element_base = ORM::factory('Ordersposition');
						foreach($data['positions'] as $pos) {
							$order_element = clone $order_element_base;
							$order_element->name = $pos["name"];
							$order_element->equipment_type_id = $pos["equipment_type_id"];
							$order_element->count = $pos["count"];
							$order_element->summ = $pos["summ"];
							$order_element->order_id = $last_id;
							$order_element->save();		
							$order_element_id = $order_element->id;	
							
							if (isset($pos["is_rm"])) {
								$order_element->isrm = '1';
							}
							
							if (!empty($pos['po'])) {
								$order_element->ispo = 1;
								$order_element->orderspositionspo->orders_positions_id = $order_element->id;
								$order_element->orderspositionspo->count_licenses=$pos['po']['count_licenses'];
								$order_element->orderspositionspo->sublicensing_contract=$pos['po']['sublicensing_contract'];
								$order_element->orderspositionspo->unique_license_number=$pos['po']['unique_license_number'];
								$order_element->orderspositionspo->save();
							}
							if (!empty($pos['warranty'])) {
								$order_element->warranty->orders_positions_id = $position->id;
								$order_element->warranty->warranty_number=$pos['warranty']['warranty_number'];
								$order_element->warranty->warranty_date=date('Y-m-d', strtotime($pos['warranty']['warranty_date']));
								$order_element->warranty->warranty_time=$pos['warranty']['warranty_time'];
								$order_element->warranty->save();
							}
							if (!empty($pos['serial_numbers'])) {
								foreach ($pos['serial_numbers'] as $sn) {
									$serial_number = ORM::factory('Orderspositionsserialnumber');
									$serial_number->orders_positions_id = $order_element->id;
									$serial_number->serial_number = $sn['serial_number'];
									$serial_number->save();
								}
							}
							

							
						}
					}		

					exit(json_encode($last_id));
			} else {
				exit(json_encode($errors));
			}

	}
		}
	}
	
}

?>