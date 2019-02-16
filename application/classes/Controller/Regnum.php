<?php
class Controller_Regnum extends Controller_Template {
	
	public function before()
	{
		parent::before();
		if (!Auth::instance()->logged_in()) {
			HTTP::redirect('/');
		}
	}
	
	public function action_getallregnums()
	{
		$json = array();
		$limit = 10;
		if ($_GET) {
			if ($_GET["page"]) {
				if ($_GET["page"] !== '1') {
					$limit = (10*$_GET["page"]-10).','.$_GET["per_page"];
				}
			}
		}
		
		$reg_numbers = ORM::factory('Registrationnumber');
		$i = 0;
		if (isset($_GET["face_search"]) && !empty($_GET["face_search"])) {
			$query = "select * from department_face where name like '%".$_GET["face_search"]."%'";
			$records = DB::query(Database::SELECT, $query)->execute();
			foreach($records as $row) {
				if ($i == 0) {
					$reg_numbers->where('face', '=', $row["id"]);
					if (isset($_GET["department"]) && !empty($_GET["department"])) {
						if (substr($_GET["department"],0,4) === 'com_') {
							$reg_numbers->where('company', '=', str_replace("com_","",$_GET["department"]));
						} else {
							$reg_numbers->where('department', '=', $_GET["department"]);
						}
					}
					$i = 1;
				} else {
					$reg_numbers->or_where('face', '=', $row["id"]);
					if (isset($_GET["department"]) && !empty($_GET["department"])) {
						if (substr($_GET["department"],0,4) === 'com_') {
							$reg_numbers->where('company', '=', str_replace("com_","",$_GET["department"]));
						} else {
							$reg_numbers->where('department', '=', $_GET["department"]);
						}
					}
				}
		
			}
		}	
		
		if (isset($_GET["department"]) && !empty($_GET["department"])) {
			if (substr($_GET["department"],0,4) === 'com_') {
				$reg_numbers->where('company', '=', str_replace("com_","",$_GET["department"]));
			} else {
				$reg_numbers->where('department', '=', $_GET["department"]);
			}
		}

		
		$json["count"] = $reg_numbers->count_all();
		
		$reg_numbers = ORM::factory('Registrationnumber');		
		$i = 0;		
		if (isset($_GET["face_search"]) && !empty($_GET["face_search"])) {
			$query = "select * from department_face where name like '%".$_GET["face_search"]."%'";
			$records = DB::query(Database::SELECT, $query)->execute();
			foreach($records as $row) {
				if ($i == 0) {
					$reg_numbers->where('face', '=', $row["id"]);
					if (isset($_GET["department"]) && !empty($_GET["department"])) {
						if (substr($_GET["department"],0,4) === 'com_') {
							$reg_numbers->where('company', '=', str_replace("com_","",$_GET["department"]));
						} else {
							$reg_numbers->where('department', '=', $_GET["department"]);
						}
					}
					$i = 1;
				} else {
					$reg_numbers->or_where('face', '=', $row["id"]);
					if (isset($_GET["department"]) && !empty($_GET["department"])) {
						if (substr($_GET["department"],0,4) === 'com_') {
							$reg_numbers->where('company', '=', str_replace("com_","",$_GET["department"]));
						} else {
							$reg_numbers->where('department', '=', $_GET["department"]);
						}
					}
				}
		
			}
		}
		
		if (isset($_GET["department"]) && !empty($_GET["department"])) {
			if (substr($_GET["department"],0,4) === 'com_') {
				$reg_numbers->where('company', '=', str_replace("com_","",$_GET["department"]));
			} else {
				$reg_numbers->where('department', '=', $_GET["department"]);
			}
		}	
		
		
		$reg_numbers = $reg_numbers->order_by('date', 'DESC')->limit($limit)->find_all()->as_array();
		$i = 0;
		foreach ($reg_numbers as $regnum) {
			$json["regnum"][$i] = $regnum->as_array();
			$json["regnum"][$i]["department"] = $regnum->departments->name;
			$json["regnum"][$i]["company"] = $regnum->companies->name;
			$json["regnum"][$i]["face"] = $regnum->faces->name;			
			$json["regnum"][$i]["date"] = date('d.m.Y', strtotime($regnum->date));
			$i++;
		}
		exit(json_encode($json));		
		
	}	
	
	public function action_index()
	{
		/**
		 * Вывод всех учетных единиц
		 **/
		if (Auth::instance()->logged_in('regnum_view') || Auth::instance()->logged_in('admin')) {
			$reg_numbers=ORM::factory('Registrationnumber');
			if (isset($_GET)) {
				
				if (isset($_GET["face_search"]) && !empty($_GET["face_search"])) {
					$query = "select * from department_face where name like '%".$_GET["face_search"]."%'";
					$records = DB::query(Database::SELECT, $query)->execute();
					$i = 0;
					foreach($records as $row) {
								if ($i == 0) {
						$reg_numbers->where('face', '=', $row["id"]);
						if (isset($_GET["department"]) && !empty($_GET["department"])) {
							if (substr($_GET["department"],0,4) === 'com_') {
								$reg_numbers->where('company', '=', str_replace("com_","",$_GET["department"]));
							} else {
								$reg_numbers->where('department', '=', $_GET["department"]);
							}
						}
									$i = 1;
								} else {
						$reg_numbers->or_where('face', '=', $row["id"]);
						if (isset($_GET["department"]) && !empty($_GET["department"])) {
							if (substr($_GET["department"],0,4) === 'com_') {
								$reg_numbers->where('company', '=', str_replace("com_","",$_GET["department"]));
							} else {
								$reg_numbers->where('department', '=', $_GET["department"]);
							}
						}
								}

					}
				}
				
				if (isset($_GET["department"]) && !empty($_GET["department"])) {
					if (substr($_GET["department"],0,4) === 'com_') {
						$reg_numbers->where('company', '=', str_replace("com_","",$_GET["department"]));
					} else {
						$reg_numbers->where('department', '=', $_GET["department"]);
					}
				}
				

			}
			
			

		//	$reg_numbers = $reg_numbers->find_all();			
			$pagination = Pagination::factory(array('total_items' => $reg_numbers->count_all(),'uri_segment' => 'regnum'));
			$pagination->setUriSegment('regnum');

			if (isset($_GET)) {
				if (isset($_GET["face_search"]) && !empty($_GET["face_search"])) {
					$query = "select * from department_face where name like '%".$_GET["face_search"]."%'";
					$records = DB::query(Database::SELECT, $query)->execute();
					$i = 0;
									foreach($records as $row) {
								if ($i == 0) {
						$reg_numbers->where('face', '=', $row["id"]);
						if (isset($_GET["department"]) && !empty($_GET["department"])) {
							if (substr($_GET["department"],0,4) === 'com_') {
								$reg_numbers->where('company', '=', str_replace("com_","",$_GET["department"]));
							} else {
								$reg_numbers->where('department', '=', $_GET["department"]);
							}
						}
									$i = 1;
								} else {
						$reg_numbers->or_where('face', '=', $row["id"]);
						if (isset($_GET["department"]) && !empty($_GET["department"])) {
							if (substr($_GET["department"],0,4) === 'com_') {
								$reg_numbers->where('company', '=', str_replace("com_","",$_GET["department"]));
							} else {
								$reg_numbers->where('department', '=', $_GET["department"]);
							}
						}
								}

					}
				}
				
				if (isset($_GET["department"]) && !empty($_GET["department"])) {
					if (substr($_GET["department"],0,4) === 'com_') {
						$reg_numbers->where('company', '=', str_replace("com_","",$_GET["department"]));
					} else {
						$reg_numbers->where('department', '=', $_GET["department"]);
					}
				}
			}

			$companies = array (1 => 'ЗАО ПK "Дитэко"', 2 => 'ЗАО СК "Дитэко"', 3 => 'ООО компания "Тандем"');
			$this->template->title = 'Учетные единицы';
			$this->template->content = View::factory('reg_numbers',array("companies" => $companies, "departments" => ORM::factory('Department')->find_all(),'pagination' => $pagination, 'reg_numbers' => $reg_numbers->limit($pagination->items_per_page)->offset($pagination->offset)->find_all()));
		} else {
			HTTP::redirect('/');
		}
	}
	
	public function action_add()
	{
		/**
		 * Добавление учетной единицы
		 **/
		if (Auth::instance()->logged_in('admin') || Auth::instance()->logged_in('regnum_add')) {
			$this->template->title ='Приход';
			
			if ($_POST) {
				$regnum = ORM::factory('Registrationnumber');
				$error = new ORM_Validation_Exception('', Validation::factory(array()));
				$regnum->values(array('date' => date('Y-m-d', strtotime($_POST["date"])), 'department' => $_POST["department"]));
				if ($department = ORM::factory('Department',$_POST['department'])) {
					$regnum->company = $department->company_id;
				}				
				try
				{
					$regnum->check();
					if (($_POST["face_id"] == '0') && (empty($_POST["face"]))) {
						$error1 = 'Не выбрали ответственное лицо';
					}
				}
				catch(ORM_Validation_Exception $e)
				{
					$error->merge($e);
				}
	
				$errors = $error->errors();

				if (! $errors && !isset($error1)) {
						
					/**
					 * Сохраняем саму учетную единицу
					 **/
					//Разберемся с ответственным лицом
					if ($_POST['face_id'] == 0) {
						
						$result = DB::query(Database::SELECT, "SELECT id from department_face where lower(name) = '".strtolower($_POST['face'])."'")->execute();
						if ($result->count()) {
						$regnum->face = $result->get('id');
						} else {
						list($insert_id, $affected_rows) = DB::query(Database::INSERT, "INSERT into department_face(name) values('".$_POST['face']."')")->execute();
						$regnum->face = $insert_id;
						}
					} else {
						$regnum->face = $_POST['face_id'];
					}
					$regnum->save();						
					$last_id = $regnum->pk();
					//записываем изменение учетной единицы в лог и получаем id записи в логе
					$reg_num_log_id = Request::factory('log/saveregnumhistory/'.$last_id)->post(array('date' => $regnum->date))->execute()->body();

				/**
					 * Сохраняем оборудование, входящее в учетную единицу
				 **/
					if (isset($_POST['id'])) {
						$i = 0;
						$ids = array();
						$order_pos_base = ORM::factory('Ordersposition');
						foreach ($_POST['id'] as $reg_position) {
								
							if (strripos($reg_position,'bu_') !== false) {
	
								/**
								 * Если оборудование б/у
								 **/
								//загрузим позицию учетной единицы
								$reg_pos = ORM::factory('Registrationnumberposition',substr($reg_position,3));
								//проверим не прикреплена ли она уже где
								//если не прикреплена, можно добавить себе								
								if ($reg_pos->status == '1' && $reg_pos->registration_number_id == '0') {
								$reg_pos->registration_number_id = $last_id;
								$reg_pos->status = '0';
								$reg_pos->save();
								//Собираем данные позиций учетных единиц для лога
								$ids[$i]['id'] = $reg_pos->id;
								$ids[$i]['date'] = $regnum->date;
								}
							} else {
	
								/**
								 * Если оборудование новое
								 **/
	
								$reg_pos = ORM::factory('Registrationnumberposition');
								$order_pos = clone $order_pos_base;
								if ($order_pos->where('id','=',$reg_position)->find()) {
									//проверим не прикреплена ли она уже где
									if ($order_pos->ispo) {
										$count = $order_pos->orderspositionspo->count_licenses;
									} else {
										$count = $order_pos->count;
									}	
									//если не прикреплена, можно добавить себе
									if ($count - $order_pos->count_used > 0) {
										// если есть серийный номер тоже надо проверить что его уже не забрали
										if ($_POST['serial_number'][$i] !== '0') {
											$reg_pos->serial_number = $_POST['serial_number'][$i];
											$lol = ORM::factory('Orderspositionsserialnumber')->where('serial_number','=',$_POST['serial_number'][$i])->find();
											if ($lol->status == '0') {
												$lol->status = '1';
												$lol->update();
											} else {
												$error_serial = '1';
											}
										}
								if (!isset($error_serial)) {												
								$reg_pos->order_id = $order_pos->order_id;
								$reg_pos->registration_number_id = $last_id;
								$reg_pos->ispo = $order_pos->ispo;
								$reg_pos->orders_positions_id = $reg_position;
								$reg_pos->name = $order_pos->name;
								$reg_pos->equipment_type_id = $order_pos->equipment_type_id;

								$reg_pos->save();
								$order_pos->count_used = $order_pos->count_used+1;
								$order_pos->save();
								//Собираем данные позиций учетных единиц для лога
								$ids[$i]['id'] = $reg_pos->id;
								$ids[$i]['date'] = $regnum->date;
								}
								}
							}
							}
							$i++;
						}

						//Записываем изменения позиций учетных единиц в лог
						Request::factory('log/saveregnumposhistory/'.$reg_num_log_id)->post(array('ids' => $ids))->execute();					
						
					}
					HTTP::redirect('/regnum/view/'.$regnum->id);
				}
	
			}
	
			$companies = array (1 => 'ЗАО ПK "Дитэко"', 2 => 'ЗАО СК "Дитэко"', 3 => 'ООО компания "Тандем"');
			$order_positions = ORM::factory('Ordersposition')->where('status', '=', '1')->find_all();
			$content = View::factory('free_orders_positions', array("companies" => $companies,"order_positions" => $order_positions,"departments"=>ORM::factory('Department')->find_all()));
				if (isset($errors)) {
					$content->bind("error",$errors);
				}
				if (isset($error1)) {
					$content->bind("error1",$error1);
				}
			$content->order_positions = $order_positions;
			$this->template->content = $content;
		} else {
			HTTP::redirect('/');
		}
	
	}
	
	public function action_view()
	{
		/**
		 * Вывод одной учетной единицы
		 **/
		$id = $this->request->param('id');
		$regnum = ORM::factory('Registrationnumber',$id);
		
		//---------- РЕДАКТИРОВАНИЕ УЧЕТНОЙ ЕДИНИЦЫ --------------		

		if (Request::initial()->method() === 'PUT') {
			$data = json_decode(Request::initial()->body(),true);
			$error = new ORM_Validation_Exception('', Validation::factory(array()));
		
			//обновим саму учетку
			
			$department = ORM::factory('Department',$data["department"]);
			$regnum->values(array('company' => $department->company_id,'department' => $department->id,'date' => date('Y-m-d', strtotime($data["date"]))));
			try
			{
				$regnum->check();
					if (($data["face_id"] == '0') && (empty($data["face"]))) {
						$error1 = 'Не выбрали ответственное лицо';
					}
			}
			catch(ORM_Validation_Exception $e)
			{
				$error->merge($e);
			}
			
			//Разберемся с ответственным лицом
			if ($data['face_id'] == 0) {
			
				$result = DB::query(Database::SELECT, "SELECT id from department_face where lower(name) = '".strtolower($data['face'])."'")->execute();
				if ($result->count()) {
					$regnum->face = $result->get('id');
				} else {
					list($insert_id, $affected_rows) = DB::query(Database::INSERT, "INSERT into department_face(name) values('".$data['face']."')")->execute();
					$regnum->face = $insert_id;
				}
			} else {
				$regnum->face = $data['face_id'];
			}
			
			$regnum->save();
			$last_id = $regnum->id;
			//записываем изменение учетной единицы в лог и получаем id записи в логе
			$reg_num_log_id = Request::factory('log/saveregnumhistory/'.$last_id)->execute()->body();		
			//сохраним позиции учетной единицы				

				if ($data["positions"]) {
					$i = 0;
					$ids = array();
					$order_pos_base = ORM::factory('Ordersposition');
					$regnum_pos_base = ORM::factory('Registrationnumberposition');
					foreach ($data["positions"] as $reg_position) {
						
						//сначала удалим и спишем старые помеченные позиции, у которых есть id
						if (isset($reg_position["id"])) {
							if ($reg_position["deleted"]) {
								$reg_pos = ORM::factory('Registrationnumberposition',$reg_position["id"]);								
								$reg_pos->status = '1';
								$ids[$i]['registration_number_id'] = $reg_pos->registration_number_id;
								$reg_pos->registration_number_id = 0;
								$reg_pos->save();
								//Собираем данные позиций учетных единиц для лога
								$ids[$i]['id'] = $reg_pos->id;
								$ids[$i]['date'] = date('Y-m-d');
								$ids[$i]['reason'] = $reg_position["reason"];							
								$ids[$i]['status'] = '1';
							}
							
							if ($reg_position["write_off"]) {
								$reg_pos = ORM::factory('Registrationnumberposition',$reg_position["id"]);
								$reg_pos->status = '2';
								$ids[$i]['registration_number_id'] = $reg_pos->registration_number_id;								
								$reg_pos->registration_number_id = 0;
								$reg_pos->save();								
								//Собираем данные позиций учетных единиц для лога
								$ids[$i]['id'] = $reg_pos->id;
								$ids[$i]['date'] = date('Y-m-d');
								$ids[$i]['reason'] = $reg_position["reason"];
								$ids[$i]['status'] = '2';
							}
							
						} else {
						if (isset($reg_position["bu_pos_id"])) {
							/**
							 * Если оборудование б/y
							 **/
							//загрузим позицию учетной единицы
							$reg_pos = ORM::factory('Registrationnumberposition',$reg_position["bu_pos_id"]);
							//проверим не прикреплена ли она уже где
							//если не прикреплена, можно добавить себе
							if ($reg_pos->status == '1' && $reg_pos->registration_number_id == '0') {
								$reg_pos->registration_number_id = $last_id;
								$reg_pos->status = '0';
								$reg_pos->save();
								//Собираем данные позиций учетных единиц для лога
								$ids[$i]['id'] = $reg_pos->id;
								$ids[$i]['date'] = date('Y-m-d');
							}
						} else {
				
							/**
							 * Если оборудование новое
							 **/

							$reg_pos = clone $regnum_pos_base;
							$order_pos = clone $order_pos_base;
							if ($order_pos->where('id','=',$reg_position["orders_positions_id"])->find()) {
								//проверим не прикреплена ли она уже где
								if ($order_pos->ispo) {
									$count = $order_pos->orderspositionspo->count_licenses;
								} else {
									$count = $order_pos->count;
								}
								//если не прикреплена, можно добавить себе
								if ($count - $order_pos->count_used > 0) {
									// если есть серийный номер тоже надо проверить что его уже не забрали
									if(isset($data['serial_number'])) {
									if (strlen($data['serial_number'])) {
										$lol = ORM::factory('Orderspositionsserialnumber')->where('serial_number','=',$data['serial_number'])->find();
										if ($lol->status == '0') {
											$lol->status = '1';
											$lol->update();
											$reg_pos->serial_number = $data['serial_number'];
										} else {
											$error_serial = '1';
										}
									}
								}
								if (!isset($error_serial)) {
									$reg_pos->order_id = $order_pos->order_id;
									$reg_pos->registration_number_id = $regnum->id;
									$reg_pos->ispo = $order_pos->ispo;
									$reg_pos->orders_positions_id = $reg_position["orders_positions_id"];
									$reg_pos->name = $order_pos->name;
									$reg_pos->equipment_type_id = $order_pos->equipment_type_id;	
									$reg_pos->save();
									$order_pos->count_used++;
									$order_pos->save();
									//Собираем данные позиций учетных единиц для лога
									$ids[$i]['id'] = $reg_pos->id;
									$ids[$i]['date'] = date('Y-m-d');
								} else {
									exit('Проблемы с серийным номером');
								}
								}
							}
						}
						}
						$i++;
					}
				
					//Записываем изменения позиций учетных единиц в лог
					Request::factory('log/saveregnumposhistory/'.$reg_num_log_id)->post(array('ids' => $ids))->execute();
										
				exit($last_id);
			}
		}
		
				//---------- ДОБАВЛЕНИЕ НОВОЙ УЧЕТНОЙ ЕДИНИЦЫ --------------	
						
			if (Request::initial()->method() === 'POST') {
				$data = json_decode(Request::initial()->body(),true);
				// сначала учетная единица	
				$regnum = ORM::factory('Registrationnumber');
				$department = new Model_Department($data["department"]);
				$regnum->values(array('company' => $department->company_id,'date' => date('Y-m-d', strtotime(str_replace('/','.',$data["date"]))), 'department' => $data["department"]));


				// разберемся с ответственным лицом
				
					$result = DB::query(Database::SELECT, "SELECT id from department_face where lower(name) = '".strtolower(str_replace(' ','',$data['face']))."'")->execute();
					if ($result->count()) {
						$regnum->face = $result->get('id');
					} else {
						list($insert_id, $affected_rows) = DB::query(Database::INSERT, "INSERT into department_face(name) values('".$data['face']."')")->execute();
						$regnum->face = $insert_id;
					}
				$regnum->save();
				$last_id = $regnum->pk();
				//записываем изменение учетной единицы в лог и получаем id записи в логе
				$reg_num_log_id = Request::factory('log/saveregnumhistory/'.$last_id)->post(array('date' => $regnum->date))->execute()->body();

				//сохраним позиции учетной единицы				

				if ($data["positions"]) {
					$i = 0;
					$ids = array();
					$order_pos_base = ORM::factory('Ordersposition');
					$regnum_pos_base = ORM::factory('Registrationnumberposition');
					foreach ($data["positions"] as $reg_position) {
				
							if (isset($reg_position["bu_pos_id"])) {
				
							/**
							 * Если оборудование б/y
							 **/
							//загрузим позицию учетной единицы
							$reg_pos = ORM::factory('Registrationnumberposition',$reg_position["bu_pos_id"]);
							//проверим не прикреплена ли она уже где
							//если не прикреплена, можно добавить себе
							if ($reg_pos->status == '1' && $reg_pos->registration_number_id == '0') {
								$reg_pos->registration_number_id = $last_id;
								$reg_pos->status = '0';
								$reg_pos->save();
								//Собираем данные позиций учетных единиц для лога
								$ids[$i]['id'] = $reg_pos->id;
								$ids[$i]['date'] = $regnum->date;
							}
						} else {
				
							/**
							 * Если оборудование новое
							 **/
				
							$reg_pos = ORM::factory('Registrationnumberposition');
							$order_pos = clone $order_pos_base;
							if ($order_pos->where('id','=',$reg_position["orders_positions_id"])->find()) {
								//проверим не прикреплена ли она уже где
								if ($order_pos->ispo) {
									$count = $order_pos->orderspositionspo->count_licenses;
								} else {
									$count = $order_pos->count;
								}
								//если не прикреплена, можно добавить себе
								if ($count - $order_pos->count_used > 0) {
									// если есть серийный номер тоже надо проверить что его уже не забрали
									if(isset($reg_position['serial_number'])) {
									if (strlen($reg_position['serial_number'])) {
										$lol = ORM::factory('Orderspositionsserialnumber')->where('serial_number','=',$reg_position['serial_number'])->find();
										if ($lol->status == '0') {
											$lol->status = '1';
											$lol->update();
										} else {
											$error_serial = '1';
										}
									}
								}
								if (!isset($error_serial)) {
									if(isset($reg_position['serial_number'])) {									
									$reg_pos->serial_number = $reg_position['serial_number'];
									}
									$reg_pos->order_id = $order_pos->order_id;
									$reg_pos->registration_number_id = $last_id;
									$reg_pos->ispo = $order_pos->ispo;
									$reg_pos->orders_positions_id = $reg_position["orders_positions_id"];
									$reg_pos->name = $order_pos->name;
									$reg_pos->equipment_type_id = $order_pos->equipment_type_id;
								
									$reg_pos->save();
									$order_pos->count_used = $order_pos->count_used+1;
									$order_pos->save();
									//Собираем данные позиций учетных единиц для лога
									$ids[$i]['id'] = $reg_pos->id;
									$ids[$i]['date'] = $regnum->date;
								} else {
									exit('Проблемы с серийным номером');
									}
								}
							}
						}
						$i++;
					}
				
					//Записываем изменения позиций учетных единиц в лог
					Request::factory('log/saveregnumposhistory/'.$reg_num_log_id)->post(array('ids' => $ids))->execute();
										

			}
			exit(json_encode($last_id));
			}
			
			//---------- ВЫВОД УЧЕТНОЙ ЕДИНИЦЫ --------------
			$json = array();
			$json = $regnum->as_array();
			$json["date"] = date("d/m/Y", strtotime($json["date"]));
			$json["face"] = $regnum->faces->name;
			$i = 0;
			
			foreach ($regnum->registrationnumberpositions->find_all() as $row) {
				$json["positions"][$i] = $row->as_array();
				$i++;
			}			

			exit(json_encode($json));
		
		$this->template->title='Учетная единица';
		$id = $this->request->param('id');
		$reg_num = ORM::factory('Registrationnumber',$id);
		
		if(!$reg_num->loaded()){
			throw HTTP_Exception::factory(404,'Нет такой учетной единицы');
		}
		$companies = array (1 => 'ЗАО ПK "Дитэко"', 2 => 'ЗАО СК "Дитэко"', 3 => 'ООО компания "Тандем"');
		if (Auth::instance()->logged_in('regnum_edit') || Auth::instance()->logged_in('admin') || Auth::instance()->logged_in('regnum_pos_edit_po') || Auth::instance()->logged_in('regnum_pos_edit') || Auth::instance()->logged_in('regnum_pos_spis') || Auth::instance()->logged_in('regnum_pos_spis_po')) {
			if ($reg_num->status == '1') {
				$shab = 'reg_numbers_no_edit';
			} else {
				$shab = 'reg_numbers_edit';
			}
		} elseif (Auth::instance()->logged_in('regnum_view')) {
			$shab = 'reg_numbers_no_edit';
		} else {
			HTTP::redirect('/');
		}		
		$content = View::factory($shab,array("companies" => $companies,"departments" => ORM::factory("Department")->find_all()));
		if (Auth::instance()->logged_in('regnum_edit') || Auth::instance()->logged_in('regnum_pos_edit_po') || Auth::instance()->logged_in('regnum_pos_edit') || Auth::instance()->logged_in('admin') || Auth::instance()->logged_in('regnum_pos_spis') || Auth::instance()->logged_in('regnum_pos_spis_po')) {
			if ($_POST) {

				/*
				 * Статусы позиций в $_POST: 0 - не тронут; 1 - добавлен; 2 - откреплен; 3 - списан. Если новое, в pos - позиция заказа, если б/у, в id - уникальный id оборудования.
				*
				*/

				$error = new ORM_Validation_Exception('', Validation::factory(array()));
				
				if (Auth::instance()->logged_in('regnum_edit') || Auth::instance()->logged_in('admin')) {				
				
				$reg_num->values(array('date' => $reg_num->date, 'department' => $_POST["department"]));
				if ($department = ORM::factory('Department',$_POST['department'])) {
					$reg_num->company = $department->company_id;
				}
				try
				{
					$reg_num->check();
					if (($_POST["face_id"] == '0') && (empty($_POST["face"]))) {
						$error1 = 'Не выбрали ответственное лицо';
					}
				}
				catch(ORM_Validation_Exception $e)
				{
					$error->merge($e);
				}
				
				}
			
				$errors = $error->errors();
			
				if (! $errors && !isset($error1)) {			

					if (Auth::instance()->logged_in('regnum_edit') || Auth::instance()->logged_in('admin')) {					
					
					if ($_POST['face_id'] == 0) {
						
						$result = DB::query(Database::SELECT, "SELECT id from department_face where lower(name) = '".strtolower($_POST['face'])."'")->execute();
						if ($result->count()) {
						$reg_num->face = $result->get('id');
						} else {
						list($insert_id, $affected_rows) = DB::query(Database::INSERT, "INSERT into department_face(name) values('".$_POST['face']."')")->execute();
						$reg_num->face = $insert_id;
						}
					} else {
						$reg_num->face = $_POST['face_id'];
					}
					
					}
							
						$reg_num->save();

						// Сохранение оборудования и ПО
							
						$i = 0;
						$ids = array();
						$order_pos_base = ORM::factory('Ordersposition');						
						while ($i<count($_POST['status'])) {
							if ($_POST['status'][$i] == '0') {
								$ids[$i]['id'] = $_POST["id"][$i];
								$ids[$i]['status'] = '3';
							}
							if ($_POST['status'][$i] == '1') {
								
								// если б/у
								if (!empty($_POST['id'][$i])) {
									// загрузим позицию учетной единицы
									$reg_pos = ORM::factory('Registrationnumberposition',$_POST["id"][$i]);
									//проверим не прикреплена ли она уже где
										//если не прикреплена, можно добавить себе
										if ($reg_pos->status == '1' && $reg_pos->registration_number_id == '0') {
									$reg_pos->registration_number_id = $reg_num->id;
									$reg_pos->status = '0';
									$reg_pos->save();	
									//Собираем id позиций учетных единиц для лога
									$ids[$i]['id'] = $reg_pos->id;
									}

								} elseif (!empty($_POST['pos'][$i])) {
								//если новое	
									$reg_num_pos = ORM::factory('Registrationnumberposition');
									$order_pos = clone $order_pos_base;
									if ($order_pos->where('id','=',$_POST['pos'][$i])->find()) {
										//проверим не прикреплена ли она уже где
										if ($order_pos->ispo) {
											$count = $order_pos->orderspositionspo->count_licenses;
										} else {
											$count = $order_pos->count;
										}
										//если не прикреплена, можно добавить себе
										if ($count - $order_pos->count_used > 0) {
											// если есть серийный номер тоже надо проверить что его уже не забрали
									if ($_POST['serial_number'][$i] !== '0') {
										$reg_num_pos->serial_number = $_POST['serial_number'][$i];
										$lol = ORM::factory('Orderspositionsserialnumber')->where('serial_number','=',$_POST['serial_number'][$i])->find();
										if ($lol->status == '0') {
											$lol->status = '1';
											$lol->update();
										} else {
											$error_serial = '1';
										}
									}
									if (!isset($error_serial)) {											
									$reg_num_pos->registration_number_id = $reg_num->id;
									$reg_num_pos->orders_positions_id = $_POST['pos'][$i];
									$reg_num_pos->name = $order_pos->name;
									$reg_num_pos->order_id = $order_pos->order_id;
									$reg_num_pos->equipment_type_id = $order_pos->equipment_type_id;									
									
									
									if ($order_pos->ispo) {
										$reg_num_pos->ispo = 1;
									}
									$reg_num_pos->save();	
									$order_pos->count_used = $order_pos->count_used+1;
									$order_pos->save();
									//Собираем id позиций учетных единиц для лога
									$ids[$i]['id'] = $reg_num_pos->id;
									$ids[$i]['status'] = '0';
								}
							}
							}
	
							}
							}
	
							if ($_POST['status'][$i] == '2' || $_POST['status'][$i] == '3') {
								$reg_num_pos = ORM::factory('Registrationnumberposition',$_POST['id'][$i]);
								if(!$reg_num_pos->loaded()){
									$return="Нет такой позиции";
								} else {
									//Собираем id позиций учетных единиц для лога
									$ids[$i]['registration_number_id'] = $reg_num_pos->registration_number_id;
									$ids[$i]['id'] = $reg_num_pos->id;
									$ids[$i]['status'] = strval(intval($_POST['status'][$i])-1);
									$ids[$i]['reason'] = $_POST["reason"][$i];
									$reg_num_pos->registration_number_id = '0';
									$reg_num_pos->status = strval(intval($_POST['status'][$i])-1);
									$reg_num_pos->save();
								}
							}
	
	
							$i++;
						}
						//записываем изменение учетной единицы в лог и получаем id записи в логе
						$reg_num_log_id = Request::factory('log/saveregnumhistory/'.$reg_num->id)->execute()->body();
						//Записываем изменения позиций учетных единиц в лог
						Request::factory('log/saveregnumposhistory/'.$reg_num_log_id)->post(array('ids' => $ids))->execute();							
							
						HTTP::redirect('/regnum/view/'.$reg_num->id);
							
						}	
						
			}

			$order_positions = ORM::factory('Ordersposition')->where('status', '=', '1')->where('ispo','=','0')->find_all();
			$content->order_positions = $order_positions;
			$free_po = ORM::factory('Ordersposition')->where('status', '=', '1')->and_where('ispo','=','1')->find_all();
			$content->bind('reg_number',$reg_num)->bind('free_po',$free_po);
				if (isset($errors)) {
					$content->bind("error",$errors);
				}
				if (isset($error1)) {
					$content->bind("error1",$error1);
				}

		} elseif (Auth::instance()->logged_in('regnum_view')) {
			$content->bind('reg_number',$reg_num);
		} 
		$this->template->content = $content;
	}
	
	public function action_spisat()
	{
		/**
		 * Списание учетной единицы
		 **/
		if (Auth::instance()->logged_in('regnum_spis') || Auth::instance()->logged_in('admin')) {
			if ($_POST["id"]) {
				$this->template->title='Учетная единица';
				$id = $_POST["id"];
				$reg_num = ORM::factory('Registrationnumber',$id);
	
				if(!$reg_num->loaded()){
					throw HTTP_Exception::factory(404,'Нет такой учетной единицы');
				}
				$reg_num->status = '1';
				$reg_num->save();
                $i = 0;
				foreach ($reg_num->registrationnumberpositions->find_all() as $r_n_p) {
					$r_n_p->status = '2';
					$r_n_p->save();
					$ids[$i]['id'] = $r_n_p->id;
					$ids[$i]['status'] = '2';
					$ids[$i]['reason'] = $_POST['reason'];
					$i++;
				}
				//записываем изменение учетной единицы в лог и получаем id записи в логе
				$reg_num_log_id = Request::factory('log/saveregnumhistory/'.$reg_num->id)->post(array('status' => '2','reason' => $_POST['reason']))->execute()->body();
				//Записываем изменения позиций учетных единиц в лог
				Request::factory('log/saveregnumposhistory/'.$reg_num_log_id)->post(array('ids' => $ids))->execute();
				HTTP::redirect('/regnum/');
			} else {
				HTTP::redirect('/orders/');
			}
		} else {
			HTTP::redirect('/');
		}
	
	}
}

?>