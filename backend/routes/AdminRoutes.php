<?php

require __DIR__ . '/../services/AdminService.php';

Flight::group('/admin', function () {

    /**
     * @OA\Get(
     *     path="/admin/orders",
     *     summary="Get all orders",
     *     description="Retrieves a comprehensive list of all orders placed in the system, typically used for administrative dashboards",
     *     tags={"Admin"},
     *     @OA\Response(
     *         response=200,
     *         description="List of all orders retrieved successfully",
     *         @OA\Schema(
     *             type="array",
     *             items=@OA\Schema(
     *                 type="object",
     *                 properties={
     *                     @OA\Property(property="order_id", type="integer", description="The unique ID of the order"),
     *                     @OA\Property(property="user_id", type="integer", description="The ID of the user who placed the order"),
     *                     @OA\Property(property="order_total", type="number", format="decimal", description="The total cost of the order"),
     *                     @OA\Property(property="created_at", type="string", format="date-time", description="Timestamp when the order was created"),
     *                     @OA\Property(
     *                         property="items", 
     *                         type="array", 
     *                         description="List of items in the order",
     *                         @OA\Items(type="object")
     *                     )
     *                 }
     *             )
     *         )
     *     )
     * )
     */
    Flight::route('GET /orders', function () {
        $service = new AdminService();
        Flight::json($service->getAllOrders());
    });
});
