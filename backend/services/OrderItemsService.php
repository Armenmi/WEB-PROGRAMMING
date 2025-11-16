<?php

require_once "BaseService.php";
require_once(__DIR__ . '/../dao/OrderItemsDao.php');


class OrderItemsService extends BaseService
{

    public function __construct($dao)
    {
        return parent::__construct($dao);
    }


}
