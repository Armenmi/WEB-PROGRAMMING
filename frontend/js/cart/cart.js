let Cart = {



    loadCart: function () {
        const cart = this.getCart();
        const cart_div = document.getElementById('cart-div');

        if (cart.length === 0) {
            cart_div.innerHTML = "<p class='text-center text-zinc-600'>Cart is empty</p>";
        } else {
            cart_div.innerHTML = "";
            for (let item of cart) {
                cart_div.innerHTML += this.createCartItem(item);
            }


            const subtotalEl = document.getElementById('cart-subtotal');
            const taxEl = document.getElementById('cart-tax');
            const totalEl = document.getElementById('cart-total');

            const subtotal = this.getCartTotal();
            const tax = subtotal * 0.137;
            const total = subtotal + tax;

            subtotalEl.innerHTML = "$" + subtotal.toFixed(2);
            taxEl.innerHTML = "$" + tax.toFixed(2);
            totalEl.innerHTML = "$" + total.toFixed(2);
        }
    },

    createCartItem: function (item) {
        return `
        <div class="flex flex-col rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-6">
            <img src="${item.picture}" class="h-32 w-32 object-contain sm:h-40 sm:w-40" alt="${item.name}">
            <div class="flex flex-1 flex-col gap-3">
                <div class="flex items-start justify-between">
                    <h2 class="text-lg font-semibold text-zinc-900">${item.name}</h2>
                    <button onclick="Cart.removeFromCart(${item.id})" class="text-zinc-400 hover:text-red-600 text-xl font-bold">×</button>
                </div>
                <div class="flex items-center gap-4">
                    <div class="flex items-center rounded-xl border border-zinc-200 bg-white">
                        <button onclick="Cart.updateQuantity(${item.id}, ${item.quantity - 1})" class="h-10 w-10 text-lg hover:bg-zinc-50">−</button>
                        <input type="number" min="1" value="${item.quantity}" onchange="Cart.updateQuantity(${item.id}, this.value)" class="h-10 w-12 border-x border-zinc-200 text-center outline-none">
                        <button onclick="Cart.updateQuantity(${item.id}, ${item.quantity + 1})" class="h-10 w-10 text-lg hover:bg-zinc-50">+</button>
                    </div>
                    <p class="text-lg font-semibold text-zinc-900">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        </div>
        `;
    },

    getCart: function () {
        const cart = localStorage.getItem(Constants.CART_KEY);
        return cart ? JSON.parse(cart) : [];
    },

    addToCart: function (product) {

        console.log("PRODUCT QUANTITY:", product.quantity);

        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {

            existingItem.quantity = Number(existingItem.quantity) + Number(product.quantity) || 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                picture: product.picture,
                price: product.price,
                quantity: product.quantity || 1
            });
        }

        localStorage.setItem(Constants.CART_KEY, JSON.stringify(cart));
    },

    removeFromCart: function (productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem(Constants.CART_KEY, JSON.stringify(cart));
    },

    updateQuantity: function (productId, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === productId);

        if (item) {
            item.quantity = Math.max(1, quantity);
            localStorage.setItem(Constants.CART_KEY, JSON.stringify(cart));
        }
    },

    clearCart: function () {
        localStorage.setItem(Constants.CART_KEY, JSON.stringify([]));
    },

    getCartTotal: function () {
        return this.getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    getCartItemCount: function () {
        return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
    },


    getItemQuantity: function (productId) {
        const item = this.getCart().find(item => item.id === productId);
        return item ? item.quantity : 0;
    },




}