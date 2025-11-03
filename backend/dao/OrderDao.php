<?php

require_once __DIR__ . '/BaseDao.php';

class OrderDao extends BaseDao
{
    protected $table_name = 'orders';

    public function __construct()
    {
        parent::__construct($this->table_name);
    }


    public function getAllOrders()
    {
        $sql = "
        SELECT 
            orders.id AS orders_id,
            orders.user_id AS orders_user_id,
            orders.order_total AS orders_order_total,

            users.id AS users_id,
            users.email AS users_email,
            users.age AS users_age,
            users.is_admin AS users_is_admin,

            order_details.id AS order_details_id,
            order_details.order_id AS order_details_order_id,
            order_details.product_id AS order_details_product_id,
            order_details.quantity AS order_details_quantity,

            products.id AS products_id,
            products.name AS products_name

        FROM orders
        INNER JOIN users ON orders.user_id = users.id
        INNER JOIN order_details ON orders.id = order_details.order_id
        INNER JOIN products ON order_details.product_id = products.id
        ORDER BY orders.id ASC
    ";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }
}
