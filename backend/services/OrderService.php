<?php

require_once "BaseService.php";
require_once(__DIR__ . '/../dao/OrderDao.php');


class OrderService extends BaseService
{

    public function __construct()
    {
        $dao = new OrderDao();
        return parent::__construct($dao);
    }

    public function getAllOrders()
    {
        return $this->dao->getAllOrders();
    }
}
