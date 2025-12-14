<?php

require_once __DIR__ . '/../services/ProductService.php';


/**
 * @OA\Get(
 *     path="/products",
 *     summary="Get all products",
 *     description="Retrieves a list of all available products with their category information and product details (colors, sizes, models)",
 *     tags={"Products"},
 *     @OA\Response(
 *         response=200,
 *         description="List of all products retrieved successfully",
 *         @OA\Schema(
 *             type="array",
 *             items=@OA\Schema(
 *                 type="object",
 *                 properties={
 *                     @OA\Property(property="product_id", type="integer", description="The product ID"),
 *                     @OA\Property(property="product_name", type="string", description="The product name"),
 *                     @OA\Property(property="product_category_id", type="integer", description="The product category ID"),
 *                     @OA\Property(property="product_price", type="number", format="decimal", description="The product price"),
 *                     @OA\Property(property="category_id", type="integer", description="The category ID"),
 *                     @OA\Property(property="category_name", type="string", description="The category name"),
 *                     @OA\Property(property="product_details_id", type="integer", description="The product details ID"),
 *                     @OA\Property(property="colors", type="string", description="Available colors for the product"),
 *                     @OA\Property(property="sizes", type="string", description="Available sizes for the product"),
 *                     @OA\Property(property="models", type="string", description="Available models for the product")
 *                 }
 *             )
 *         )
 *     )
 * )
 */
Flight::route('GET /products', function () {
    $service = new ProductService();
    Flight::json($service->getAllProducts());
});


/**
 * @OA\Get(
 *     path="/products/product/{id}",
 *     summary="Get product by ID",
 *     description="Retrieves a single product by its ID, including full product details, category information, colors, sizes, and models",
 *     tags={"Products"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="The product ID",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Product details retrieved successfully",
 *         @OA\Schema(
 *             type="object",
 *             properties={
 *                 @OA\Property(property="product_id", type="integer", description="The product ID"),
 *                 @OA\Property(property="product_name", type="string", description="The product name"),
 *                 @OA\Property(property="product_category_id", type="integer", description="The product category ID"),
 *                 @OA\Property(property="product_price", type="number", format="decimal", description="The product price"),
 *                 @OA\Property(property="category_id", type="integer", description="The category ID"),
 *                 @OA\Property(property="category_name", type="string", description="The category name"),
 *                 @OA\Property(property="product_details_id", type="integer", description="The product details ID"),
 *                 @OA\Property(property="colors", type="string", description="Available colors for the product"),
 *                 @OA\Property(property="sizes", type="string", description="Available sizes for the product"),
 *                 @OA\Property(property="models", type="string", description="Available models for the product"),
 *                 @OA\Property(property="product_details_category", type="string", description="The product category (e.g., men, women, kids)")
 *             }
 *         )
 *     ),
 *     @OA\Response(response=404, description="Product not found")
 * )
 */
Flight::route('GET /products/product/@id', function ($id) {
    $service = new ProductService();
    Flight::json($service->getProductById($id));
});


/**
 * @OA\Get(
 *     path="/products/men",
 *     summary="Get men's products",
 *     description="Retrieves a list of all products in the men's category, including product details with colors, sizes, and models",
 *     tags={"Products"},
 *     @OA\Response(
 *         response=200,
 *         description="List of men's products retrieved successfully",
 *         @OA\Schema(
 *             type="array",
 *             items=@OA\Schema(
 *                 type="object",
 *                 properties={
 *                     @OA\Property(property="product_id", type="integer", description="The product ID"),
 *                     @OA\Property(property="product_name", type="string", description="The product name"),
 *                     @OA\Property(property="product_category_id", type="integer", description="The product category ID"),
 *                     @OA\Property(property="product_price", type="number", format="decimal", description="The product price"),
 *                     @OA\Property(property="category_id", type="integer", description="The category ID"),
 *                     @OA\Property(property="category_name", type="string", description="The category name"),
 *                     @OA\Property(property="product_details_id", type="integer", description="The product details ID"),
 *                     @OA\Property(property="colors", type="string", description="Available colors for the product"),
 *                     @OA\Property(property="sizes", type="string", description="Available sizes for the product"),
 *                     @OA\Property(property="models", type="string", description="Available models for the product"),
 *                     @OA\Property(property="product_details_category", type="string", description="Product category type (men)", example="men")
 *                 }
 *             )
 *         )
 *     )
 * )
 */
Flight::route('GET /products/men', function () {
    $service = new ProductService();
    Flight::json($service->getMenProducts());
});


/**
 * @OA\Get(
 *     path="/products/women",
 *     summary="Get women's products",
 *     description="Retrieves a list of all products in the women's category, including product details with colors, sizes, and models",
 *     tags={"Products"},
 *     @OA\Response(
 *         response=200,
 *         description="List of women's products retrieved successfully",
 *         @OA\Schema(
 *             type="array",
 *             items=@OA\Schema(
 *                 type="object",
 *                 properties={
 *                     @OA\Property(property="product_id", type="integer", description="The product ID"),
 *                     @OA\Property(property="product_name", type="string", description="The product name"),
 *                     @OA\Property(property="product_category_id", type="integer", description="The product category ID"),
 *                     @OA\Property(property="product_price", type="number", format="decimal", description="The product price"),
 *                     @OA\Property(property="category_id", type="integer", description="The category ID"),
 *                     @OA\Property(property="category_name", type="string", description="The category name"),
 *                     @OA\Property(property="product_details_id", type="integer", description="The product details ID"),
 *                     @OA\Property(property="colors", type="string", description="Available colors for the product"),
 *                     @OA\Property(property="sizes", type="string", description="Available sizes for the product"),
 *                     @OA\Property(property="models", type="string", description="Available models for the product"),
 *                     @OA\Property(property="product_details_category", type="string", description="Product category type (women)", example="women")
 *                 }
 *             )
 *         )
 *     )
 * )
 */
Flight::route('GET /products/women', function () {
    $service = new ProductService();
    Flight::json($service->getWomenProducts());
});


/**
 * @OA\Get(
 *     path="/products/kids",
 *     summary="Get kids' products",
 *     description="Retrieves a list of all products in the kids' category, including product details with colors, sizes, and models",
 *     tags={"Products"},
 *     @OA\Response(
 *         response=200,
 *         description="List of kids' products retrieved successfully",
 *         @OA\Schema(
 *             type="array",
 *             items=@OA\Schema(
 *                 type="object",
 *                 properties={
 *                     @OA\Property(property="product_id", type="integer", description="The product ID"),
 *                     @OA\Property(property="product_name", type="string", description="The product name"),
 *                     @OA\Property(property="product_category_id", type="integer", description="The product category ID"),
 *                     @OA\Property(property="product_price", type="number", format="decimal", description="The product price"),
 *                     @OA\Property(property="category_id", type="integer", description="The category ID"),
 *                     @OA\Property(property="category_name", type="string", description="The category name"),
 *                     @OA\Property(property="product_details_id", type="integer", description="The product details ID"),
 *                     @OA\Property(property="colors", type="string", description="Available colors for the product"),
 *                     @OA\Property(property="sizes", type="string", description="Available sizes for the product"),
 *                     @OA\Property(property="models", type="string", description="Available models for the product"),
 *                     @OA\Property(property="product_details_category", type="string", description="Product category type (kids)", example="kids")
 *                 }
 *             )
 *         )
 *     )
 * )
 */
Flight::route('GET /products/kids', function () {
    $service = new ProductService();
    Flight::json($service->getKidsProducts());
});
