<?php
class Model_Orders extends ORM {
	
	protected $_table_name = 'orders';
 
	protected $_has_many = array(
		'orderspositions' => array(
				'model'         => 'Ordersposition',
				'foreign_key' => 'order_id',
				)
	);
	
	protected $_belongs_to = array(
			'suppliers' => array(
					'model' => 'Supplier',
					'foreign_key' => 'supplier_id',
			),
			'buhdoc' => array(
					'model' => 'Buhdoc',
					'foreign_key' => 'buh_doc',
			),
			'companies' => array(
					'model' => 'Company',
					'foreign_key' => 'company',
			),
	);
	
	public function rules()
	{
		return array(
				'invoice_date' => array(
						array('not_empty'),array('date')),
				'invoice_number' => array(
						array('not_empty')),
				'company' => array(
						array('not_empty')),
		);
	}
	
	public function search($data)
	{
		
	}
	
	public function setValues($data) 
	{
		$this->values(array('company' => $data["company"]["id"],'supplier_id' => $data["supplier"], 'invoice_date' => date('Y-m-d', strtotime($data["invoice_date"])), 'invoice_number' => $data["invoice_number"], 'request_number' => $data["request_number"],'request_date' => $data["request_date"] ? date('Y-m-d', strtotime($data["request_date"])) : null,'status' => '0'));
		if ($data['supplier'] == 0) {
			$result = DB::query(Database::SELECT, "SELECT id from suppliers where lower(name) = '".strtolower($data['new_supplier'])."'")->execute();
			if ($result->count()) {
				$this->supplier_id = $result->get('id');
			} else {
				$supplier = ORM::factory('Supplier');
				$supplier->name = $data['new_supplier'];
				$supplier->save();
				$this->supplier_id=$supplier->pk();
			}
		} else {
			$this->supplier_id=$data['supplier'];
		}	
	}
}

?>