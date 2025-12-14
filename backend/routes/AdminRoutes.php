<?php

require __DIR__ . '/../services/AdminService.php';

Flight::group('/admin', function () {



    Flight::route('GET /orders', function () {

        $service = new AdminService();

        Flight::json($service->getAllOrders());
    });
});
