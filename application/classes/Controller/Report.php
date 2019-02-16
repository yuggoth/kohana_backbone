<?php
class Controller_Report extends Controller {
	
	public function before()
	{
		parent::before();
		if (!Auth::instance()->logged_in()) {
			HTTP::redirect('/');
		}
	}
	
	public function action_forma1()
	{
		/**
		 * Вывод формы со склада на печать
		 **/
		$companies = array (1 => 'ЗАО ПK "Дитэко"', 2 => 'ЗАО СК "Дитэко"', 3 => 'ООО компания "Тандем"');
		//находим по id это изменение из истории
		$izm = ORM::factory("Registrationnumberlog",$this->request->param('id'));
		//если не нашли, выводим 404
		if(!$izm->loaded()){
			throw HTTP_Exception::factory(404,'Нет такого изменения');
		}
		//далее находим предыдущее изменение для того чтоб определиться какие документы нужны для этого изменения
		
		$arr = ORM::factory("Registrationnumberlog")->where('registration_number_id','=',$izm->registration_number_id)->order_by('date','DESC')->order_by('id','DESC')->find_all()->as_array();
		$i = 0;
		foreach ($arr as $history) {
			if ($i == '1') {
				$izm1 = $history;
				break;
			}
			if ($izm->id == $history->id) {
				$i++;
			}		
		}
		$content = View::factory('/report/forma1',array("companies" => $companies, "izm" => $izm));
		//Если есть предыдущее изменение, мы его тоже добавляем
		if (isset($izm1)) {
			$content->bind('izm1', $izm1);
		}
		return $this->response->body($content);
		
	}
	
	public function action_forma11()
	{
		/**
		 * Вывод формы на склад на печать
		 **/
		$companies = array (1 => 'ЗАО ПK "Дитэко"', 2 => 'ЗАО СК "Дитэко"', 3 => 'ООО компания "Тандем"');
		//находим по id это изменение из истории
		$izm = ORM::factory("Registrationnumberlog",$this->request->param('id'));
		//если не нашли, выводим 404
		if(!$izm->loaded()){
			throw HTTP_Exception::factory(404,'Нет такого изменения');
		}
		//далее находим предыдущее изменение для того чтоб определиться какие документы нужны для этого изменения
		$arr = ORM::factory("Registrationnumberlog")->where('registration_number_id','=',$izm->registration_number_id)->order_by('date','DESC')->order_by('id','DESC')->find_all()->as_array();
		$i = 0;
		foreach ($arr as $history) {
			if ($i == '1') {
				$izm1 = $history;
				break;
			}
			if ($izm->id == $history->id) {
				$i++;
			}
		}		
		$content = View::factory('/report/forma11',array("companies" => $companies, "izm" => $izm));
		//Если есть предыдущее изменение, мы его тоже добавляем
		if (isset($izm1)) {
			$content->bind('izm1', $izm1);
		}
		return $this->response->body($content);
	
	}
	
}