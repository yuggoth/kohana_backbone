<?php

class Controller_Log extends Controller {
	
	public function before()
	{
		parent::before();
		if (!Auth::instance()->logged_in()) {
			HTTP::redirect('/');
		}
	}
	

	public function action_saveregnumhistory()
	{
		/**
		 * Добавление записи в лог учетных единиц
		 **/

		//проверяем внешний или внутренний запрос
		if ($this->request->is_initial()) { HTTP::redirect('/'); }
		//проверяем есть ли такая учетная единица
		$reg_num = ORM::factory('Registrationnumber',$this->request->param('id'));
		if($reg_num->loaded()){
			//сохраняем ее в лог
			$reg_num_log = ORM::factory('Registrationnumberlog');
			$reg_num_log->registration_number_id = $this->request->param('id');

			if ($this->request->post('date')) {
				$reg_num_log->date = $this->request->post('date');
			} else {
				$reg_num_log->date = date("Y-m-d");
			}
			
			if ($this->request->post('status')) {
				$reg_num_log->status = $this->request->post('status');
			} else {
				$reg_num_log->status = '0';
			}
			
			$reg_num_log->department = $reg_num->department;
			$reg_num_log->face = $reg_num->face;
			$reg_num_log->editor = Auth::instance()->get_user()->id;
			$reg_num_log->company = $reg_num->company;
			$reg_num_log->save();
			//возвращаем id записи в логе
			return $this->response->body($reg_num_log->pk());
		}
	}
	
	public function action_saveregnumposhistory()
	{
		/**
		 * Добавление записей в лог позиций учетных единиц
		 **/
		//проверяем внешний или внутренний запрос
		if ($this->request->is_initial()) { HTTP::redirect('/'); }
		$reg_num_pos_log_base = ORM::factory('Registrationnumberpositionlog');
		$reg_num_pos_base = ORM::factory('Registrationnumberposition');
		//переберем все позиции в полученном массиве
		$array = $this->request->post('ids');
		if (isset($array) && !empty($array)) {
			$i = 0;
			foreach ($array as $id) {
				//проверяем есть ли такая позиция учетной единицы
				$reg_num_pos = clone $reg_num_pos_base;
				if ($reg_num_pos->where('id','=',$id['id'])->find()) {
					$reg_num_pos_log = clone $reg_num_pos_log_base;
					$reg_num_pos_log->registration_number_position_id = $reg_num_pos->id;

					$reg_num_pos_log->id_izm = $this->request->param('id');
					$reg_num_pos_log->editor = Auth::instance()->get_user()->id;
					if (isset($id['date'])) {
						$reg_num_pos_log->date = $id['date'];
					} else {
						$reg_num_pos_log->date = date("Y-m-d");
					}
					if (isset($id['registration_number_id'])) {
						$reg_num_pos_log->registration_number_id = $id['registration_number_id'];
					} else {
						$reg_num_pos_log->registration_number_id = $reg_num_pos->registration_number_id;						
					}
					
					if (isset($id['status'])) {
						$reg_num_pos_log->status = $id['status'];
					}
					if (isset($id['reason'])) {
						$reg_num_pos_log->reason = $id['reason'];
					}

					$reg_num_pos_log->save();
				}
				$i++;
			}
		}
		return $this->response->body();
	}
	
	public function action_showregnumhistory()
	{
		/**
		 * Вывод истории изменений учетной единицы
		 **/	
	/*	$companies = array (1 => 'ЗАО ПK "Дитэко"', 2 => 'ЗАО СК "Дитэко"', 3 => 'ООО компания "Тандем"');
		$content = View::factory('/log/reg_number_log',array("companies" => $companies));
		$history = ORM::factory("Registrationnumberlog")->where('registration_number_id','=',$this->request->param('id'))->order_by('date', 'DESC')->order_by('id', 'DESC')->find_all()->as_array();		
		if (count($history)) {
			$content->set('reg_number_history',$history);
		}		
		return $this->response->body($content);		*/
		$json = array();
		$history = ORM::factory("Registrationnumberlog")->where('registration_number_id','=',$this->request->param('id'))->order_by('date', 'DESC')->order_by('id', 'DESC')->find_all()->as_array();				
		$i = 0;
		foreach($history as $history_item) {
			$json[$i] = $history_item->as_array();
			$json[$i]["face"] = $history_item->faces->name;
			$json[$i]["editor"] = $history_item->users->username;
			$json[$i]["company"] = $history_item->companies->name;
			$json[$i]["department"] = $history_item->departments->name;		
			$json[$i]["date"] = date('d.m.Y', strtotime($history_item->date));	
			$ii = 0;
			$json[$i]["items"] = array();
			foreach ($history_item->registrationnumberpositionlogs->find_all() as $item) {
				$json[$i]["items"][$ii]=$item->as_array();
				$json[$i]["items"][$ii]["name"] = $item->registrationnumberpositions->name;
				$json[$i]["items"][$ii]["serial_number"] = $item->registrationnumberpositions->serial_number;				
				$json[$i]["items"][$ii]["id"] = $item->registrationnumberpositions->id;				
				if ($item->status == '0') { 
					$json[$i]["items"][$ii]["action"] = "прикреплено"; 
				}
				if ($item->status == '1') {
					$json[$i]["items"][$ii]["action"] = "откреплено";
				}	
				if ($item->status == '2') {
					$json[$i]["items"][$ii]["action"] = "списано";
				}
				$ii++;
			}									
			$i++;
		}
		exit(json_encode($json));
		
	}

	public function action_showregnumposhistory()
	{
		/**
		 * Вывод истории изменений позиции учетной единицы
		 **/
		$history = ORM::factory("Registrationnumberpositionlog")->where('registration_number_position_id','=',$this->request->param('id'))->order_by('date', 'DESC')->order_by('id', 'DESC')->find_all()->as_array();
		$json = array();
		$i = 0;
		foreach($history as $history_item) {
			$json[$i] = $history_item->as_array();
			if ($history_item->status == '0') { 
					$json[$i]["action"] = "прикреплено"; 
				}
				if ($history_item->status == '1') {
					$json[$i]["action"] = "откреплено";
				}
				
				if ($history_item->status == '2') {
					$json[$i]["action"] = "списано";
				}
				$json[$i]["face"] = $history_item->registrationnumberlogs->faces->name;				
				$json[$i]["department"] = $history_item->registrationnumberlogs->departments->name;			
				$json[$i]["name"] = $history_item->registrationnumberpositions->name;
				$json[$i]["editor"] = $history_item->users->username;				
				$json[$i]["serial_number"] = $history_item->registrationnumberpositions->serial_number;
				$json[$i]["id"] = $history_item->id;
				$i++;				
		}
		exit(json_encode($json));	
		
	}

}

?>