<?php

require_once __DIR__ . '/BaseDao.php';

class ProductDao extends BaseDao
{
    protected $table_name = 'products';

    public function __construct()
    {
        parent::__construct($this->table_name);
    }
}

?>
