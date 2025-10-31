<?php

require_once __DIR__ . '/BaseDao.php';

class ProductDetailsDao extends BaseDao
{
    protected $table_name = 'product_details';

    public function __construct()
    {
        parent::__construct($this->table_name);
    }
}

?>
