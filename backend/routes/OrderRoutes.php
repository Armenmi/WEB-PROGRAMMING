<?php

require_once __DIR__ . "/../services/OrderService.php";

Flight::route('POST /orders', function () {
    try {
        $rawBody = Flight::request()->getBody();
        $data = json_decode($rawBody, true);

        // Debug: log what we received
        error_log("Raw body: " . $rawBody);
        error_log("Decoded data: " . print_r($data, true));

        if ($data === null) {
            throw new Exception("Invalid JSON received");
        }

        if (!isset($data['user_id'])) {
            throw new Exception("user_id is missing. Received keys: " . implode(', ', array_keys($data)));
        }

        $userId = $data['user_id'];
        $orderTotal = $data['order_total'];
        $orderItems = $data['items'];

        $orderService = new OrderService();
        $result = $orderService->createOrder($userId, $orderTotal, $orderItems);

        Flight::json(['success' => true, 'order_id' => $result], 201);
    } catch (Exception $e) {
        Flight::json(['success' => false, 'error' => $e->getMessage()], 500);
    }
});
