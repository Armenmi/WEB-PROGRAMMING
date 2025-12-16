var app = $.spapp({
  defaultView: "#view_main",
  templateDir: "./html/",
  pageNotFound: "error_404"
});


app.route({
  view: "view_main",
  load: "view_main.html",
  onCreate: () => {
    ProductService.getAllProducts();

  }
});

app.route({
  view: "view_men",
  load: "view_men.html",
  onCreate: () => {
    ProductService.getMenProducts();

  }
});

app.route({
  view: "view_women",
  load: "view_women.html",
  onCreate: () => {
    ProductService.getWomenProducts();


  }
});

app.route({
  view: "view_kids",
  load: "view_kids.html",
  onCreate: () => {
    ProductService.getKidsProducts();
  }
});

app.route({
  view: "view_item",
  load: "view_item.html",
  onCreate: () => {


  }
});






app.route({
  view: "view_signup",
  load: "view_signup.html",
  onCreate: () => {
    console.log("test!");

  }
});


app.route({
  view: "view_cart",
  load: "view_cart.html",
  onCreate: () => {
    Cart.loadCart();
  }
});

app.route({
  view: "view_shop",
  load: "view_shop.html",
});

app.route({
  view: "view_login",
  load: "view_login.html",
  onCreate: () => {
    console.log("test!");

  }
});

const userToken = localStorage.getItem("user_token");

if (userToken) {
  try {
    const token = jwt_decode(userToken);

    if (token.user && token.user.is_admin == 1) {
      app.route({
        view: "view_admin",
        load: "view_admin.html",
      });
    }
  } catch (error) {
    console.error("Invalid token found, clearing storage:", error);
    localStorage.removeItem("user_token"); // Clean up bad token
  }
}


app.run();