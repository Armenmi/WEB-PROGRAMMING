<?php


require_once "ProductDao.php";

$productDao = new ProductDao();


$result = $productDao->getAllProducts();

print_r($result);
