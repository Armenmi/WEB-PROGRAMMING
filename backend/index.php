<?php


// Imports vendor packages
require __DIR__ . "/../vendor/autoload.php";


// Routes
require __DIR__ . '/routes/ProductRoutes.php';



Flight::route('/*', function () {
    echo "Test route working!";
});




Flight::start();
