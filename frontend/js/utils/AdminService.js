let AdminService = {

    initializeTotalStats: function () {
        const token = localStorage.getItem('user_token');

        fetch('http://localhost/web/backend/admin/stats', {
            headers: {
                'Authentication': token
            }
        })
            .then(response => response.json())
            .then(data => {
                const ordersElement = document.getElementById('totalOrders');
                const revenueElement = document.getElementById('totalRevenue');

                // Define styles dynamically
                const numberStyle = "font-size: 2.5rem !important; font-weight: 800 !important; line-height: 1.2 !important; letter-spacing: -1px !important;";

                // Update Total Orders
                if (ordersElement) {
                    ordersElement.innerText = data.total_orders;
                    ordersElement.style.cssText = numberStyle + " color: #111 !important;";
                }

                // Update Revenue
                if (revenueElement) {
                    const formattedRevenue = parseFloat(data.total_revenue).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                    revenueElement.innerText = '$' + formattedRevenue;
                    revenueElement.style.cssText = numberStyle + " color: #0d6efd !important;";
                }
            })
            .catch(error => console.error('Error fetching stats:', error));
    },


    initializeOrdersTable: function () {
        const token = localStorage.getItem('user_token');

        fetch('http://localhost/Armen-Mili-Web-Project/backend/admin/orders', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const tbody = document.querySelector('#ordersTable tbody');
                tbody.innerHTML = '';

                data.forEach(order => {
                    const row = document.createElement('tr');
                    row.className = 'hover:bg-zinc-50/50 transition';

                    row.innerHTML = `
                        <td class="px-6 py-4 text-sm font-mono text-zinc-900">${order.id || order.order_id}</td>
                        <td class="px-6 py-4 text-sm text-zinc-900">${order.user_id}</td>
                        <td class="px-6 py-4 text-sm text-zinc-700">${order.product_id}</td>
                        <td class="px-6 py-4 text-sm text-zinc-600">${order.quantity}</td>
                        <td class="px-6 py-4 text-sm font-semibold text-zinc-900">$${parseFloat(order.order_total).toFixed(2)}</td>
                    `;

                    tbody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }
}