<?php


require_once "ProductService.php";


$test = new ProductService();

print_r($test->getAllProducts());
