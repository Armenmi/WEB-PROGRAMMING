<?php

require_once __DIR__ . '/BaseDao.php';

class OrderDao extends BaseDao
{
    protected $table_name = 'orders';

    public function __construct()
    {
        parent::__construct($this->table_name);
    }
}

?>
