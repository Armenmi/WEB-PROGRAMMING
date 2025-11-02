<?php

require_once __DIR__ . '/BaseDao.php';

class CategoryDao extends BaseDao
{
    protected $table_name = 'category';

    public function __construct()
    {
        parent::__construct($this->table_name);
    }
}

?>
