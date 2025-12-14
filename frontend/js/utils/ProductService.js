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
    // Color name to hex mapping
    const colorMap = {
      // Basic colors
      'red': '#ef4444',
      'blue': '#3b82f6',
      'green': '#22c55e',
      'yellow': '#eab308',
      'purple': '#a855f7',
      'pink': '#ec4899',
      'black': '#000000',
      'white': '#ffffff',
      'gray': '#6b7280',
      'orange': '#f97316',
      'brown': '#92400e',
      'beige': '#d4c5b9',
      'gold': '#fbbf24',
      'lime': '#84cc16',

      'midnight blue': '#1e3a8a',
      'sunset orange': '#fb923c',
      'jet black': '#000000',
      'arctic white': '#f8fafc',
      'crimson red': '#dc2626',
      'cloud gray': '#9ca3af',
      'volt green': '#84cc16',
      'frost white': '#f1f5f9',
      'royal blue': '#2563eb',
      'solar gold': '#fbbf24',
      'storm gray': '#6b7280',
      'neon lime': '#a3e635',
      'sand beige': '#e7d4c0',
      'ocean blue': '#0ea5e9',
      'canyon brown': '#78350f',
      'ash gray': '#9ca3af',
      'charcoal': '#374151',
      'ice blue': '#bfdbfe',
      'onyx': '#18181b',
      'ember red': '#dc2626',
      'slate': '#64748b',
      'pearl white': '#fafafa'
    };
    const getColorHex = (colorName) => {
      const normalized = colorName.toLowerCase().trim();
      return colorMap[normalized] || normalized;
    };

    return `
  <div class="space-y-5">
    <div>
      <p class="text-sm font-medium text-red-600">${data.category_name}</p>
      <h1 class="mt-1 text-3xl font-extrabold tracking-tight text-zinc-900">${data.product_name}</h1>
      <p class="mt-2 text-2xl font-bold text-zinc-900">$${parseFloat(data.product_price).toFixed(2)}</p>
    </div>

    <!-- Rating -->
    <div class="flex items-center gap-3 text-sm">
      <div class="flex items-center gap-0.5 text-yellow-500" aria-label="4.6 out of 5 stars">
        ★★★★☆
      </div>
      <span class="text-zinc-500">(128 reviews)</span>
    </div>

    <!-- Models -->
    <div>
      <p class="mb-2 text-sm font-medium text-zinc-800">Models</p>
      <div class="flex flex-wrap gap-2">
        ${data.models.split(',').map(model => `
          <button class="model-btn rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:border-zinc-300 hover:shadow-sm transition">
            ${model.trim()}
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Colors -->
    <div>
      <p class="mb-2 text-sm font-medium text-zinc-800">Colors</p>
      <div class="flex gap-2">
        ${data.colors.split(',').map(color => {
      const trimmedColor = color.trim();
      const hexColor = getColorHex(trimmedColor);
      const borderColor = trimmedColor.toLowerCase() === 'white' ? 'border-zinc-300' : 'border-transparent';

      return `
            <button 
              data-color="${trimmedColor}" 
              style="background-color: ${hexColor}" 
              class="color-opt h-10 w-10 rounded-full border-2 ${borderColor} shadow-sm transition hover:scale-110 hover:ring-2 hover:ring-offset-2 hover:ring-red-500"
              aria-label="Select ${trimmedColor}">
            </button>
          `;
    }).join('')}
      </div>
    </div>

    <!-- Sizes -->
    <div>
      <p class="mb-2 text-sm font-medium text-zinc-800">Select size</p>
      <div class="grid grid-cols-4 gap-2">
        ${(() => {
        const sizeRange = data.sizes.match(/\d+/g);
        if (sizeRange && sizeRange.length === 2) {
          const start = parseInt(sizeRange[0]);
          const end = parseInt(sizeRange[1]);
          let btns = '';
          for (let i = start; i <= end; i++) {
            btns += `<button class="size-opt rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:border-zinc-300 hover:shadow-sm transition">US ${i}</button>`;
          }
          return btns;
        }
        return '';
      })()}
      </div>
    </div>

    <!-- Quantity + CTA -->
    <div class="flex flex-wrap items-center gap-3">
      <div class="flex items-center rounded-xl border border-zinc-200 bg-white">
        <button id="qtyDec" class="h-11 w-11 rounded-l-xl text-lg hover:bg-zinc-50">−</button>
        <input id="qty" type="number" min="1" value="1" class="h-11 w-14 border-x border-zinc-200 text-center outline-none" />
        <button id="qtyInc" class="h-11 w-11 rounded-r-xl text-lg hover:bg-zinc-50">+</button>
      </div>
      <button id="addCart"   
       onclick="Cart.addToCart({id: ${data.product_id}, name: '${data.product_name.replace(/'/g, "\\'")}', picture: '${data.image || ''}', price: ${data.product_price}, quantity: document.getElementById('qty').value}); Toast.show('Added to cart!')"
        class="inline-flex h-11 flex-1 items-center justify-center rounded-2xl bg-red-600 px-6 text-sm font-semibold text-white shadow-sm ring-1 ring-red-700/10 transition hover:bg-red-700 active:scale-[0.98]">
        Add to Cart
      </button>
    </div>

    <!-- Details -->
    <div class="space-y-3 border-t border-zinc-200 pt-5">
      <p class="text-sm font-semibold text-zinc-900">Product Details</p>
      <ul class="space-y-1 text-sm text-zinc-700">
        <li class="flex items-center gap-2">
          <span class="h-1 w-1 rounded-full bg-red-600"></span> 
          Category: ${data.product_details_category}
        </li>
        ${data.models.split(',').map(model => `
          <li class="flex items-center gap-2">
            <span class="h-1 w-1 rounded-full bg-red-600"></span> 
            ${model.trim()}
          </li>
        `).join('')}
      </ul>
    </div>
  </div>
  `;
  }
}
