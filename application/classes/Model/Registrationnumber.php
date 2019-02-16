<?php
class Model_Registrationnumber extends ORM {
	
	protected $_table_name = 'registration_number';
	
	protected $_has_many = array(
			'registrationnumberpositions' => array(
					'model'         => 'Registrationnumberposition',
					'foreign_key' => 'registration_number_id',
			)
	);
	
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
			)
	);
	
	public function rules()
	{
		return array(
				'date' => array(
						array('not_empty')),
				'department' => array(
						array('not_empty')),
				'company' => array(
						array('not_empty'))
		);
	}

}

?>