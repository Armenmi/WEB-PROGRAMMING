let ProductService = {
  getAllProducts: function () {
    fetch(Constants.BASE_URL + 'products')
      .then((data) => data.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  },


  getMenProducts: function () {
    fetch(Constants.BASE_URL + 'products/men')
      .then((data) => data.json())
      .then((res) => {
        const grid = document.getElementById("product-grid");
        grid.innerHTML = "";
        for (let item of res) {
          grid.innerHTML += ProductService.createProductCard(item);
        }
      })
      .catch((err) => console.error(err));
  },



  getWomenProducts: function () {
    fetch(Constants.BASE_URL + 'products/women')
      .then((data) => data.json())
      .then((res) => {
        const grid = document.getElementById("product-grid");
        grid.innerHTML = "";
        for (let item of res) {
          grid.innerHTML += ProductService.createProductCard(item);
        }
      })
      .catch((err) => console.error(err));
  },


  getKidsProducts: function () {
    fetch(Constants.BASE_URL + 'products/kids')
      .then((data) => data.json())
      .then((res) => {
        const grid = document.getElementById("product-grid");
        grid.innerHTML = "";
        for (let item of res) {
          grid.innerHTML += ProductService.createProductCard(item);
        }
      })
      .catch((err) => console.error(err));
  },



  createProductCard: function (data) {
    return `
        <article class="group overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md">
            <a href="#view_item" onclick = "ProductService.getProductById(${data.product_id})">
                <div class="relative">
                    <span class="absolute left-3 top-3 rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                        ${data.category_name || "New"}
                    </span>

                    <img
                        src="${data.image ?? 'https://via.placeholder.com/300x300?text=No+Image'}"
                        alt="${data.product_name}"
                        class="mx-auto h-52 w-full object-contain transition duration-300 group-hover:scale-[1.03]"
                    />
                </div>

                <div class="mt-4 space-y-1">
                    <h3 class="text-lg font-semibold text-zinc-900">${data.product_name}</h3>
                    <p class="text-zinc-600">$${data.product_price}</p>
                </div>

                <div class="mt-4 flex items-center gap-2">
                    <button class="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white shadow-sm ring-1 ring-red-700/10 transition hover:bg-red-700 active:scale-[0.98]">
                        Add to Cart
                    </button>
                    <button class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-800 transition hover:border-zinc-300">
                        ♥
                    </button>
                </div>
            </a>
        </article>
    `;
  },

  getProductById: function (id) {
    fetch(Constants.BASE_URL + `products/product/${id}`)
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        const productView = document.getElementById('product-view');


        if (productView) {
          console.log("PWEXIST");
          productView.innerHTML = this.createProductView(res);

          const qtyInput = document.getElementById('qty');
          const cartQuantity = Cart.getItemQuantity(res.product_id);
          if (cartQuantity > 0) {
            qtyInput.value = cartQuantity;
          }


        } else {
          console.log("PW NO EXIST");

        }
        // Insert the product HTML into the aside
      })
      .catch((err) => console.error(err));
  },

  createProductView: function (data) {
    return `
    <div
      class="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm ring-1 ring-transparent hover:ring-[rgba(239,68,68,.25)] transition">
      <div class="flex items-start justify-between gap-6">
        <div>
          <h1 class="text-2xl font-extrabold text-zinc-900 md:text-3xl">${data.product_name}</h1>
          <p class="mt-1 text-zinc-600">${data.product_details_category}'s Shoes</p>
        </div>
        <button id="wishBtn"
          class="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-800 hover:border-zinc-300">
          ♥
        </button>
      </div>

      <!-- Rating -->
      <div class="mt-3 flex items-center gap-3 text-sm">
        <div class="flex items-center gap-0.5 text-yellow-500" aria-label="4.6 out of 5 stars">
          ★★★★☆
        </div>
        <span class="text-zinc-500">(128 reviews)</span>
      </div>

      <!-- Price -->
      <div class="mt-4 flex items-baseline gap-3">
        <p class="text-3xl font-extrabold text-zinc-900">$${data.product_price}</p>
        <span class="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700">Free Shipping</span>
      </div>

      <!-- Colors -->
      <div class="mt-6">
        <p class="mb-2 text-sm font-medium text-zinc-800">Color</p>
        <div id="colorGroup" class="flex flex-wrap gap-2">
          ${data.colors.split(',').map(color => `<button data-color="${color.trim()}" class="color-opt h-9 w-9 rounded-full border-2 border-transparent bg-${color.trim().toLowerCase()} ring-2 ring-${color.trim().toLowerCase()}/30 hover:ring-${color.trim().toLowerCase()}"></button>`).join('')}
        </div>
      </div>

      <!-- Sizes -->
      <div class="mt-6">
        <div class="mb-2 flex items-center justify-between">
          <p class="text-sm font-medium text-zinc-800">Size (US)</p>
          <a href="#size-guide" class="text-xs font-semibold text-red-700 hover:underline">Size guide</a>
        </div>
        <div id="sizeGroup" class="grid grid-cols-4 gap-2">
          ${data.sizes.split(',').map(size => `<button class="size-opt rounded-xl border border-zinc-200 bg-white px-0 py-2 text-sm font-semibold text-zinc-900 hover:border-zinc-300">${size.trim()}</button>`).join('')}
        </div>
      </div>

      <!-- Quantity + CTA -->
      <div class="mt-6 flex flex-wrap items-center gap-3">
        <div class="flex items-center rounded-xl border border-zinc-200 bg-white">
          <button id="qtyDec" class="h-11 w-11 rounded-l-xl text-lg hover:bg-zinc-50">−</button>
       <input id="qty" type="number" min="1" value="1" class="h-11 w-14 border-x border-zinc-200 text-center outline-none" />

          <button id="qtyInc" class="h-11 w-11 rounded-r-xl text-lg hover:bg-zinc-50">+</button>
        </div>
        <button id="addCart"   
  onclick="Cart.addToCart({id: ${data.product_id}, name: '${data.product_name}', picture: '${data.image}', price: ${data.product_price}, quantity:
  document.getElementById('qty').value})"
        class="inline-flex h-11 flex-1 items-center justify-center rounded-2xl bg-red-600 px-6 text-sm font-semibold text-white shadow-sm ring-1 ring-red-700/10 transition hover:bg-red-700 active:scale-[0.98]">
          Add to Carttt
        </button>
        <button class="inline-flex h-11 flex-1 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-900 transition hover:border-zinc-300 hover:shadow-sm">
          Buy Now
        </button>
      </div>
    </div>
    `;
  }
}
