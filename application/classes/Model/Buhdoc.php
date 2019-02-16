<?php
class Model_Buhdoc extends ORM {
	
	protected $_table_name = 'buh_doc';
	
	public function rules()
	{
		return array(
				'invoice' => array(
						array('not_empty'))
		);
	}
	

}

?>