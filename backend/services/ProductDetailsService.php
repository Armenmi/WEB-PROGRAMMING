<?php

require_once "BaseService.php";
require_once(__DIR__ . '/../dao/ProductDetailsDao.php');


class ProductDetailsService extends BaseService
{

    public function __construct($dao)
    {
        $dao = new ProductDetailsDao();
        return parent::__construct($dao);
    }
}
