<?php
class Model_Orderspositionspo extends ORM {
	
	protected $_table_name = 'orders_positions_po';
	
	public function rules()
	{
		return array(
				'count_licenses' => array(
						array('not_empty')),
				'sublicensing_contract' => array(
						array('not_empty')),
				'unique_license_number' => array(
						array('not_empty'))
		);
	}
		


}

?>