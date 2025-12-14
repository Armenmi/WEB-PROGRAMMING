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

        public function createOrder($userId, $orderTotal, $orderItems = [])
        {
            // Insert the order
            $sql = "INSERT INTO orders (user_id, order_total) VALUES (:user_id, :order_total)";
            $stmt = $this->connection->prepare($sql);
            $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
            $stmt->bindParam(':order_total', $orderTotal);
            $stmt->execute();

            // Get the last inserted order ID
            $orderId = $this->connection->lastInsertId();

            // Insert order items
            if (!empty($orderItems)) {
                $sql = "INSERT INTO order_items (order_id, product_id, quantity) VALUES (:order_id, :product_id, :quantity)";
                $stmt = $this->connection->prepare($sql);

                foreach ($orderItems as $item) {
                    $stmt->bindParam(':order_id', $orderId, PDO::PARAM_INT);
                    $stmt->bindParam(':product_id', $item['id'], PDO::PARAM_INT);
                    $stmt->bindParam(':quantity', $item['quantity'], PDO::PARAM_INT);
                    $stmt->execute();
                }
            }

            return $orderId;
        }


        public function getOrderById($orderId)
        {
            $sql = "
              SELECT
                  o.id as order_id,
                  o.user_id,
                  o.order_total,
                  oi.id as item_id,
                  oi.product_id,
                  oi.quantity,
                  p.name as product_name,
                  p.price as product_price
              FROM orders o
              LEFT JOIN order_items oi ON o.id = oi.order_id
              LEFT JOIN products p ON oi.product_id = p.id
              WHERE o.id = :order_id
          ";

            $stmt = $this->connection->prepare($sql);
            $stmt->bindParam(':order_id', $orderId, PDO::PARAM_INT);
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($results)) {
                return null;
            }

            // Format the response
            $order = [
                'id' => $results[0]['order_id'],
                'user_id' => $results[0]['user_id'],
                'order_total' => $results[0]['order_total'],
                'items' => []
            ];

            foreach ($results as $row) {
                if ($row['item_id']) {
                    $order['items'][] = [
                        'item_id' => $row['item_id'],
                        'product_id' => $row['product_id'],
                        'product_name' => $row['product_name'],
                        'product_price' => $row['product_price'],
                        'quantity' => $row['quantity']
                    ];
                }
            }

            return $order;
        }
    }
