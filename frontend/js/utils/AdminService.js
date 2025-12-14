let AdminService = {

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