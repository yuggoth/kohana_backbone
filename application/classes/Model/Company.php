<?php
class Model_Company extends ORM {
	
	protected $_table_name = 'company';
	
	protected $_has_many = array(
			'departments' => array(
					'model'         => 'Department',
					'foreign_key' => 'company_id',
			)
	);

}

?>