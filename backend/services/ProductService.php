<?php

require_once "BaseService.php";
require_once(__DIR__ . '/../dao/ProductDao.php');


class ProductService extends BaseService
{

    public function __construct()
    {
        $dao = new ProductDao();
        return parent::__construct($dao);
    }

    public function getProductDetails()
    {
        return $this->dao->getProductDetails();
    }

    public function getProductById($product_id)
    {
        return $this->dao->getProductById($product_id);
    }

    public function getProductByCategory($categoryName)
    {
        return $this->dao->getProductByCategory($categoryName);
    }

    public function getAllProducts()
    {
        return $this->dao->getAllProducts();
    }



    public function getMenProducts()
    {
        return $this->dao->getMenProducts();
    }


    public function getWomenProducts()
    {
        return $this->dao->getWomenProducts();
    }


    public function getKidsProducts()
    {
        return $this->dao->getKidsProducts();
    }
}
