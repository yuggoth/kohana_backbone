<?php
class Model_Registrationnumberlog extends ORM {
	
	protected $_table_name = 'registration_number_log';
	
	protected $_belongs_to = array(
			'departments' => array(
					'model' => 'Department',
					'foreign_key' => 'department',
			),
			'companies' => array(
					'model' => 'Company',
					'foreign_key' => 'company',
			),
			'faces' => array(
					'model' => 'Departmentface',
					'foreign_key' => 'face',
			),
			'users' => array(
					'model' => 'User',
					'foreign_key' => 'editor',
			)
	);
	
	protected $_has_many = array(
			'registrationnumberpositionlogs' => array(
					'model'         => 'Registrationnumberpositionlog',
					'foreign_key' => 'id_izm',
			)
	);

}

?>