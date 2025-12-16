<?php



use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require __DIR__ . '/dao/Config.php';
require __DIR__ . '/services/AuthService.php';
require __DIR__ . '/middleware/AuthMiddleware.php';

// Imports vendor packages
require __DIR__ . "/../vendor/autoload.php";

//Register services BEFORE defining routes
Flight::register('authService', 'AuthService');
Flight::register('authMiddleware', 'AuthMiddleware');


Flight::before('start', function (&$params, &$output) {
    $url = Flight::request()->url;

    // Allow public auth routes without token (use === 0 to check if URL STARTS with path)
    if (
        strpos($url, '/auth/login') === 0 ||
        strpos($url, '/products') === 0 ||
        strpos($url, '/auth/register') === 0
    ) {
        return true;
    }

    // Admin routes - require valid token AND admin privileges (check BEFORE other routes)
    // Use === 0 to ensure URL STARTS with /admin (not just contains it)
    if (strpos($url, '/admin') === 0) {
        try {
            $authHeader = Flight::request()->getHeader('Authorization');

            // Extract token from "Bearer <token>"
            $token = str_replace('Bearer ', '', $authHeader);

            if (Flight::authMiddleware()->verifyToken($token) && Flight::authMiddleware()->verifyIsAdmin()) {
                return true;
            }

            // If we get here, auth passed but not admin
            Flight::halt(403, "Access denied: Admin privileges required");
        } catch (Exception $e) {
            Flight::halt(401, $e->getMessage());
        }
    }

    // All other routes - require valid token
    else {
        try {
            $authHeader = Flight::request()->getHeader("Authorization");

            if (!$authHeader) {
                Flight::halt(401, "Missing Authorization header");
            }

            // Extract token from "Bearer <token>"
            $token = str_replace('Bearer ', '', $authHeader);

            if (Flight::authMiddleware()->verifyToken($token)) {
                return true;
            }

            Flight::halt(401, "Authentication failed");
        } catch (\Exception $e) {
            Flight::halt(401, $e->getMessage());
        }
    }
});


// Routes
require __DIR__ . '/routes/ProductRoutes.php';
require __DIR__ . '/routes/OrderRoutes.php';
require __DIR__ . '/routes/AuthRoutes.php';
require __DIR__ . '/routes/AdminRoutes.php';




Flight::start();
