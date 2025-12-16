<?php

require_once "BaseService.php";
require_once __DIR__ . '/../dao/OrderDao.php';

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




    public function createOrder($userId, $orderTotal, $orderItems)
    {
        return $this->dao->createOrder($userId, $orderTotal, $orderItems);
    }

    public function getOrderById($orderId)
    {
        return $this->dao->getOrderById($orderId);
    }
}
