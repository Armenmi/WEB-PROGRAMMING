<?php

require_once __DIR__ . '/BaseDao.php';

class AdminDao extends BaseDao
{
    protected $table_name = 'admin';

    public function __construct()
    {
        parent::__construct($this->table_name);
    }
}
