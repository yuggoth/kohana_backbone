<?php
class Model_Registrationnumberposition extends ORM {
	
	protected $_table_name = 'registration_number_position';
	
	protected $_belongs_to = array(
			'equipmenttypes' => array(
					'model' => 'Equipmenttype',
					'foreign_key' => 'equipment_type_id',
			),
			'registrationnumbers' => array(
					'model' => 'Registrationnumber',
					'foreign_key' => 'registration_number_id',
			),
			
			'orderpositions' => array(
					'model' => 'Ordersposition',
					'foreign_key' => 'orders_positions_id',
			),
	);
	
	public function rules()
	{
		return array(
				'registration_number_id' => array(
						array('not_empty')),
				'name' => array(
						array('not_empty')),
				'orders_positions_id' => array(
						array('not_empty')),
				'equipment_type_id' => array(
						array('not_empty')),
				'order_id' => array(
						array('not_empty'))
		);
	}

}

?>