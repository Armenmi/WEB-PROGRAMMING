<?php

require_once "BaseService.php";
require_once(__DIR__ . '/../dao/AdminDao.php');


class AdminService extends BaseService
{

    public function __construct()
    {
        $dao = new AdminDao();
        return parent::__construct($dao);
    }

    public function getAllOrdersByUser($user_id)
    {
        return $this->dao->getAllOrdersByUser($user_id);
    }
}
