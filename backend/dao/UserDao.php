<?php

require_once __DIR__ . '/BaseDao.php';

class UserDao extends BaseDao
{
    protected $table_name = 'users';


    public function __construct()
    {
        parent::__construct($this->table_name);
    }
    
}

?>