<?php



$productUpdateTest = new ProductDao();
$user = $userDao->add([
    'email' => 'mia.lopez@example.com',
    'password' => 'MiaPass!234',
    'address' => '456 Ocean Ave, Miami, FL',
    'age' => 27
]);

$categoryNames = ['Sneakers', 'Running', 'Basketball', 'Lifestyle'];
$categories = [];

foreach ($categoryNames as $name) {
    $categories[$name] = $categoryDao->add(['name' => $name]);
}

$productSeed = [
    [
        'name' => 'Velocity Knit Sneaker',
        'category' => 'Sneakers',
        'price' => 118.00,
        'details' => [
            'colors' => 'Jet Black, Arctic White',
            'sizes' => 'US 6-12',
            'models' => 'Low Top, High Top',
        ]
    ],
    [
        'name' => 'Skyline Court High',
        'category' => 'Sneakers',
        'price' => 132.50,
        'details' => [
            'colors' => 'Crimson Red, Cloud Gray',
            'sizes' => 'US 7-13',
            'models' => 'Classic, Premium',
        ]
    ],
    [
        'name' => 'Aurora Trail Running Shoes',
        'category' => 'Running',
        'price' => 129.99,
        'details' => [
            'colors' => 'Midnight Blue, Sunset Orange',
            'sizes' => 'US 7-13',
            'models' => 'Standard Cushion, Max Cushion',
        ]
    ],
    [
        'name' => 'Pulse Tempo Trainer',
        'category' => 'Running',
        'price' => 114.75,
        'details' => [
            'colors' => 'Volt Green, Frost White',
            'sizes' => 'US 5-12',
            'models' => 'Tempo, Stability',
        ]
    ],
    [
        'name' => 'Elevate Pro Basketball',
        'category' => 'Basketball',
        'price' => 139.40,
        'details' => [
            'colors' => 'Royal Blue, Solar Gold',
            'sizes' => 'US 8-14',
            'models' => 'Mid Ankle, High Ankle',
        ]
    ],
    [
        'name' => 'Hoops Flight Mid',
        'category' => 'Basketball',
        'price' => 124.25,
        'details' => [
            'colors' => 'Storm Gray, Neon Lime',
            'sizes' => 'US 7-15',
            'models' => 'Indoor, Outdoor',
        ]
    ],
    [
        'name' => 'Coastline Slip-On',
        'category' => 'Lifestyle',
        'price' => 89.95,
        'details' => [
            'colors' => 'Sand Beige, Ocean Blue',
            'sizes' => 'US 4-11',
            'models' => 'Canvas, Knit',
        ]
    ],
    [
        'name' => 'Metro Day Hiker',
        'category' => 'Lifestyle',
        'price' => 142.00,
        'details' => [
            'colors' => 'Canyon Brown, Ash Gray',
            'sizes' => 'US 6-13',
            'models' => 'Waterproof, Lightweight',
        ]
    ],
    [
        'name' => 'Stratus Elite Runner',
        'category' => 'Running',
        'price' => 136.60,
        'details' => [
            'colors' => 'Deep Navy, Signal Orange',
            'sizes' => 'US 6-12',
            'models' => 'Responsive, Cushion',
        ]
    ],
    [
        'name' => 'Urban Flux Low',
        'category' => 'Sneakers',
        'price' => 102.35,
        'details' => [
            'colors' => 'Charcoal, Ice Blue',
            'sizes' => 'US 5-12',
            'models' => 'Mesh, Leather',
        ]
    ],
    [
        'name' => 'Prime Vertical Jump',
        'category' => 'Basketball',
        'price' => 149.99,
        'details' => [
            'colors' => 'Onyx, Ember Red',
            'sizes' => 'US 9-16',
            'models' => 'Elite Cushion, Power Grip',
        ]
    ],
    [
        'name' => 'Harbor Walk Classic',
        'category' => 'Lifestyle',
        'price' => 97.50,
        'details' => [
            'colors' => 'Slate, Pearl White',
            'sizes' => 'US 5-11',
            'models' => 'Canvas, Suede',
        ]
    ]
];

$products = [];

foreach ($productSeed as $seed) {
    $product = $productDao->add([
        'name' => $seed['name'],
        'category_id' => $categories[$seed['category']]['id'],
        'price' => $seed['price']
    ]);

    $productDetailsDao->add([
        'product_id' => $product['id'],
        'colors' => $seed['details']['colors'],
        'sizes' => $seed['details']['sizes'],
        'models' => $seed['details']['models'],
    ]);

    $products[$seed['name']] = $product;
}

$ordersData = [
    [
        'items' => [
            ['product' => 'Aurora Trail Running Shoes', 'quantity' => 1],
            ['product' => 'Velocity Knit Sneaker', 'quantity' => 2]
        ]
    ],
    [
        'items' => [
            ['product' => 'Elevate Pro Basketball', 'quantity' => 1],
            ['product' => 'Hoops Flight Mid', 'quantity' => 1],
            ['product' => 'Prime Vertical Jump', 'quantity' => 1]
        ]
    ],
    [
        'items' => [
            ['product' => 'Coastline Slip-On', 'quantity' => 1],
            ['product' => 'Harbor Walk Classic', 'quantity' => 1],
            ['product' => 'Urban Flux Low', 'quantity' => 3]
        ]
    ]
];

$seededOrders = [];

foreach ($ordersData as $orderData) {
    $total = 0;
    foreach ($orderData['items'] as $item) {
        $total += $products[$item['product']]['price'] * $item['quantity'];
    }

    $order = $orderDao->add([
        'user_id' => $user['id'],
        'order_total' => $total
    ]);

    foreach ($orderData['items'] as $item) {
        $orderItemsDao->add([
            'order_id' => $order['id'],
            'product_id' => $products[$item['product']]['id'],
            'quantity' => $item['quantity']
        ]);
    }

    $seededOrders[] = $order;
}





echo "Seeded user:\n";
print_r($user);

echo "\nSeeded categories:\n";
print_r($categoryDao->getAll());

echo "\nSeeded products:\n";
print_r($productDao->getAll());

echo "\nSeeded product details:\n";
print_r($productDetailsDao->getAll());

echo "\nSeeded orders:\n";
print_r($seededOrders);

echo "\nAll order items:\n";
print_r($orderItemsDao->getAll());
