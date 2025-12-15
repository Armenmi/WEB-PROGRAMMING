<?php

require_once __DIR__ . "/../services/OrderService.php";

/**
 * @OA\Post(
 *     path="/orders",
 *     summary="Create a new order",
 *     description="Creates a new order for a specific user containing a list of items and the total price",
 *     tags={"Orders"},
 *     @OA\RequestBody(
 *         description="Order data",
 *         required=true,
 *         @OA\JsonContent(
 *             required={"user_id", "order_total", "items"},
 *             @OA\Property(property="user_id", type="integer", description="The ID of the user placing the order", example=1),
 *             @OA\Property(property="order_total", type="number", format="decimal", description="The total amount for the order", example=99.50),
 *             @OA\Property(
 *                 property="items",
 *                 type="array",
 *                 description="Array of items included in the order",
 *                 @OA\Items(
 *                     type="object",
 *                     properties={
 *                         @OA\Property(property="product_id", type="integer", example=10),
 *                         @OA\Property(property="quantity", type="integer", example=2),
 *                         @OA\Property(property="price", type="number", format="decimal", example=49.75)
 *                     }
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Order created successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="success", type="boolean", example=true),
 *             @OA\Property(property="order_id", type="integer", description="The ID of the newly created order")
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal Server Error or Invalid Data",
 *         @OA\JsonContent(
 *             @OA\Property(property="success", type="boolean", example=false),
 *             @OA\Property(property="error", type="string", description="Error message details")
 *         )
 *     )
 * )
 */
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
