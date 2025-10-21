var app = $.spapp({
  defaultView  : "#view_main",
  templateDir  : "./html/",
  pageNotFound : "error_404"
});


app.route({
  view : "view_main",
  load : "view_main.html",
  onCreate : ()=>{
    console.log("test!");
    
  }
});

app.route({
  view : "view_men",
  load : "view_men.html",
  onCreate : ()=>{
    console.log("test!");
    
  }
});

app.route({
  view : "view_women",
  load : "view_women.html",
  onCreate : ()=>{
    console.log("test!");
    
  }
});

app.route({
  view : "view_kids",
  load : "view_kids.html",
  onCreate : ()=>{
    console.log("test!");
    
  }
});

app.route({
  view : "view_item",
  load : "view_item.html",
  onCreate : ()=>{
    console.log("test!");
    
  }
});


app.route({
  view : "view_signup",
  load : "view_signup.html",
  onCreate : ()=>{
    console.log("test!");
    
  }
});


app.route({
  view : "view_login",
  load : "view_login.html",
  onCreate : ()=>{
    console.log("test!");
    
  }
});

app.run();