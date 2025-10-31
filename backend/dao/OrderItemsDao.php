<?php

require_once __DIR__ . '/BaseDao.php';

class OrderItemsDao extends BaseDao
{
    protected $table_name = 'order_items';

    public function __construct()
    {
        parent::__construct($this->table_name);
    }
}

?>
