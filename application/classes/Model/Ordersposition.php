<?php
class Model_Ordersposition extends ORM {
	
	protected $_table_name = 'orders_positions';
	
	protected $_belongs_to = array(
			'equipmenttypes' => array(
					'model' => 'Equipmenttype',
					'foreign_key' => 'equipment_type_id',
			),
			'order' => array(
					'model' => 'Orders',
					'foreign_key' => 'order_id',
			),
			
			'buhdoc' => array(
					'model' => 'Buhdoc',
					'foreign_key' => 'buh_doc',
			),
	);
	
	protected $_has_many = array(
			'serialnumbers' => array(
					'model' => 'Orderspositionsserialnumber',
					'foreign_key' => 'orders_positions_id',
			),
	);
	
	protected $_has_one = array(
			'orderspositionspo' => array(
					'model' => 'Orderspositionspo',
					'foreign_key' => 'orders_positions_id',
			),
			
			'warranty' => array(
					'model' => 'Orderspositionswarranty',
					'foreign_key' => 'orders_positions_id',
			),
	);
	
	public function rules()
	{
		return array(
				'name' => array(
						array('not_empty')),
				'count' => array(
						array('not_empty')),
				'summ' => array(
						array('not_empty')),
				'equipment_type_id' => array(
						array('not_empty'))				
		);
	}

}

?>