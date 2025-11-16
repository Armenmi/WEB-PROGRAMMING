# Products Schema

## Tables

### `products`
- `id` (INT, PK)
- `name` (VARCHAR)
- `category_id` (INT, FK → category.id)
- `price` (DECIMAL)

### `category`
- `id` (INT, PK)
- `name` (VARCHAR) - Values: Sneakers, Running, Basketball, Lifestyle

### `product_details`
- `id` (INT, PK)
- `product_id` (INT, FK → products.id)
- `colors` (VARCHAR) - Comma-separated
- `sizes` (VARCHAR) - Comma-separated
- `models` (VARCHAR) - Comma-separated
- `category` (VARCHAR) - Values: men, women, kids

## Relationships
- `products.category_id` → `category.id` (product type)
- `product_details.product_id` → `products.id` (one-to-one)

## Notes
- `category` table defines product types (Running, Basketball, etc.)
- `product_details.category` defines target demographic (men, women, kids)
