<?php
class Model_Orderspositionswarranty extends ORM {
	
	protected $_table_name = 'orders_positions_warranty';
	
	public function rules()
	{
		return array(
				'warranty_number' => array(
						array('not_empty')),
				'warranty_date' => array(
						array('not_empty')),
				'warranty_time' => array(
						array('not_empty'))
		);
	}

}

?>