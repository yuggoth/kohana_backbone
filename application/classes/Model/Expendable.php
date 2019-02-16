<?php
class Model_Expendable extends ORM {
	
	protected $_table_name = 'expendables';
	
	protected $_belongs_to = array(
			'departments' => array(
					'model' => 'Department',
					'foreign_key' => 'department',
			),
			'registrationnumberpositions' => array(
					'model'         => 'Registrationnumberposition',
					'foreign_key' => 'registration_number_position_id',
			),
			'order' => array(
					'model' => 'Orders',
					'foreign_key' => 'order_id',
			),
	);

	
	
}

?>