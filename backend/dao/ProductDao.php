<?php

require_once __DIR__ . '/BaseDao.php';

class ProductDao extends BaseDao
{
    protected $table_name = 'products';

    public function __construct()
    {
        parent::__construct($this->table_name);
    }


    public function getProductDetails()
    {
        $sql = "
        SELECT 
            category.id AS category_id,
            category.name AS category_name,
            products.id AS product_id,
            products.name AS product_name,
            product_details.id AS product_details_id,
            product_details.colors AS product_details_colors,
            product_details.sizes AS product_details_sizes,
            product_details.models AS product_details_models,
            product_details.category AS product_details_category
        FROM category
        INNER JOIN products ON category.id = products.id
        INNER JOIN product_details ON products.id = product_details.product_id
    ";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }


    public function getProductById($product_id)
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
            pd.models,
            pd.category    AS product_details_category
        FROM products p
        JOIN category c
            ON c.id = p.category_id
        LEFT JOIN product_details pd
            ON pd.product_id = p.id
        WHERE p.id = :product_id
    ";

        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':product_id', $product_id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getProductByCategory($categoryName)
    {
        $sql = "
              SELECT
                  products.id AS product_id,
                  products.name AS product_name,
                  category.id AS category_id,
                  category.name,
                  product_details.colors,
                  product_details.sizes,
                  product_details.models
              FROM products
              INNER JOIN category ON category.id = products.id
              LEFT JOIN product_details ON product_details.product_id = products.id
              WHERE category.name = :category_name
          ";

        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':category_name', $categoryName, PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
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


    public function getMenProducts()
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
            pd.models,
            pd.category    AS product_details_category
        FROM products p
        JOIN category c
            ON c.id = p.category_id
        LEFT JOIN product_details pd
            ON pd.product_id = p.id
        WHERE pd.category = 'men'
        ORDER BY p.id
    ";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function getWomenProducts()
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
            pd.models,
            pd.category    AS product_details_category
        FROM products p
        JOIN category c
            ON c.id = p.category_id
        LEFT JOIN product_details pd
            ON pd.product_id = p.id
        WHERE pd.category = 'women'
        ORDER BY p.id
    ";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function getKidsProducts()
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
            pd.models,
            pd.category    AS product_details_category
        FROM products p
        JOIN category c
            ON c.id = p.category_id
        LEFT JOIN product_details pd
            ON pd.product_id = p.id
        WHERE pd.category = 'kids'
        ORDER BY p.id
    ";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
