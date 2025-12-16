let NavbarService = {
    __init: function () {
        const navbar = document.getElementById("navbar");
        navbar.innerHTML = "";
        const userToken = localStorage.getItem("user_token");

        if (!userToken) {
            console.log("Nema tokena");

            this.renderNavbar();
            return;
        }

        const decodedToken = jwt_decode(userToken);
        const isAdmin = decodedToken.user.is_admin;

        if (isAdmin === 1) {
            console.log("ADMIN LOGGED IN!");
            this.renderAdminNavbar();
        } else if (isAdmin === 0) {
            console.log("USER Logged in!!!");
            this.renderUserNavbar();
        }
    },

    renderAdminNavbar: function () {
        const navbar = document.getElementById("navbar");
        navbar.innerHTML = "";
        navbar.innerHTML = `
      <header class="sticky top-0 z-40 w-full border-b border-zinc-200/70 bg-white/80 backdrop-blur">
        <div class="mx-auto flex h-16 max-w-7xl items-center px-6 md:px-8">
          <a class="mr-6 inline-flex items-center gap-2" href="#">
            <img src="./static/logo.png" class="h-10 w-10 rounded-md shadow-soft" alt="Logo">
          </a>

          <nav class="hidden w-full md:block">
            <ul class="flex items-center justify-center gap-4 font-semibold text-zinc-800">
              <li><a class="border-b-2 border-transparent pb-1 hover:border-red-500 hover:text-red-700 transition" href="#view_main">Home</a></li>
              <li><a class="border-b-2 border-transparent pb-1 hover:border-red-500 hover:text-red-700 transition" href="#view_shop">Shop</a></li>
              <li><a class="border-b-2 border-transparent pb-1 hover:border-red-500 hover:text-red-700 transition" href="#view_cart">Cart</a></li>
              <li><a class="border-b-2 border-transparent pb-1 hover:border-red-500 hover:text-red-700 transition" href="#view_admin">Admin</a></li>
            </ul>
          </nav>

          <p class="font-semibold">
            <a class="border-b-2 border-transparent pb-1 hover:border-red-500 hover:text-red-700 transition cursor-pointer" onclick="AuthService.logOut()">
              Logout
            </a>
          </p>
        </div>
      </header>
    `;
    },

    renderUserNavbar: function () {
        const navbar = document.getElementById("navbar");
        navbar.innerHTML = "";
        navbar.innerHTML = `
      <header class="sticky top-0 z-40 w-full border-b border-zinc-200/70 bg-white/80 backdrop-blur">
        <div class="mx-auto flex h-16 max-w-7xl items-center px-6 md:px-8">
          <a class="mr-6 inline-flex items-center gap-2" href="#">
            <img src="./static/logo.png" class="h-10 w-10 rounded-md shadow-soft" alt="Logo">
          </a>

          <nav class="hidden w-full md:block">
            <ul class="flex items-center justify-center gap-4 font-semibold text-zinc-800">
              <li><a class="border-b-2 border-transparent pb-1 hover:border-red-500 hover:text-red-700 transition" href="#view_main">Home</a></li>
              <li><a class="border-b-2 border-transparent pb-1 hover:border-red-500 hover:text-red-700 transition" href="#view_shop">Shop</a></li>
              <li><a class="border-b-2 border-transparent pb-1 hover:border-red-500 hover:text-red-700 transition" href="#view_cart">Cart</a></li>
            </ul>
          </nav>

          <p class="font-semibold">
            <a class="border-b-2 border-transparent pb-1 hover:border-red-500 hover:text-red-700 transition cursor-pointer" onclick="AuthService.logOut()">
              Logout
            </a>
          </p>
        </div>
      </header>
    `;
    },

    renderNavbar: function () {
        const navbar = document.getElementById("navbar");
        navbar.innerHTML = "";
        navbar.innerHTML = `
      <header class="sticky top-0 z-40 w-full border-b border-zinc-200/70 bg-white/80 backdrop-blur">
        <div class="mx-auto flex h-16 max-w-7xl items-center px-6 md:px-8">
          <a class="mr-6 inline-flex items-center gap-2" href="#">
            <img src="./static/logo.png" class="h-10 w-10 rounded-md shadow-soft" alt="Logo">
          </a>

          <nav class="hidden w-full md:block">
            <ul class="flex items-center justify-center gap-4 font-semibold text-zinc-800">
              <li><a class="border-b-2 border-transparent pb-1 hover:border-red-500 hover:text-red-700 transition" href="#view_main">Home</a></li>
              <li><a class="border-b-2 border-transparent pb-1 hover:border-red-500 hover:text-red-700 transition" href="#view_shop">Shop</a></li>
              <li><a class="border-b-2 border-transparent pb-1 hover:border-red-500 hover:text-red-700 transition" href="#view_cart">Cart</a></li>
            </ul>
          </nav>

          <p class="font-semibold">
            <a class="border-b-2 border-transparent pb-1 hover:border-red-500 hover:text-red-700 transition" href="#view_login">
              Login
            </a>
          </p>
        </div>
      </header>
    `;
    },
};