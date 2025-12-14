let OrderService = {

    checkout: function () {
        // Get the JWT token from localStorage
        const token = localStorage.getItem('user_token');

        if (!token) {
            alert('Please log in to place an order');
            window.location.href = '#view_login';
            return Promise.reject('No token found');
        }

        // Decode the JWT token to get user_id
        const decoded = jwt_decode(token);
        const userId = decoded.user.id;

        // Get cart items from Cart
        const cartItems = Cart.getCart();

        if (!cartItems || cartItems.length === 0) {
            alert('Your cart is empty!');
            return Promise.reject('Cart is empty');
        }

        const orderTotal = cartItems.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        const orderData = {
            user_id: userId,
            order_total: orderTotal,
            items: cartItems
        };

        return fetch('http://localhost/Armen-Mili-Web-Project/backend/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Order created successfully:', data);
                    Cart.clearCart();
                    Cart.loadCart();
                    alert('Order placed successfully!');
                    return data;
                } else {
                    console.error('Error from server:', data.error);
                    alert('Failed to place order: ' + data.error);
                    throw new Error(data.error);
                }
            })
            .catch(error => {
                console.error('Error creating order:', error);
                alert('Failed to place order. Please try again.');
                throw error;
            });
    }

}