<?php
class Model_Registrationnumberpositionlog extends ORM {
	
	protected $_table_name = 'registration_number_position_log';
	
	protected $_belongs_to = array(
			'equipmenttypes' => array(
					'model' => 'Equipmenttype',
					'foreign_key' => 'equipment_type_id',
			),

			'registrationnumberpositions' => array(
					'model' => 'Registrationnumberposition',
					'foreign_key' => 'registration_number_position_id',
			),
			
			'registrationnumberlogs' => array(
					'model' => 'Registrationnumberlog',
					'foreign_key' => 'id_izm',
			),
				
			'users' => array(
					'model' => 'User',
					'foreign_key' => 'editor',
			)
	);

}

?>