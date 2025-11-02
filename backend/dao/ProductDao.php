<?php

require_once __DIR__ . '/BaseDao.php';

class ProductDao extends BaseDao
{
    protected $table_name = 'products';

    public function __construct()
    {
        parent::__construct($this->table_name);
    }

    public function getAllProducts()
    {
        $sql = "
        SELECT
            -- products
            p.id           AS product_id,
            p.name         AS product_name,
            p.category_id  AS product_category_id,
            p.price        AS product_price,

            -- category
            c.id           AS category_id,
            c.name         AS category_name,

            -- product_details
            pd.id          AS product_details_id,
            pd.colors,
            pd.sizes,
            pd.models
        FROM products p
        JOIN category c
            ON c.id = p.category_id
        LEFT JOIN product_details pd
            ON pd.product_id = p.id
        ORDER BY p.id
    ";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute();

        // make sure we get associative keys (so aliases matter)
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
