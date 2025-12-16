let AuthService = {
    register: function () {
        console.log("Registering user...");

        const registerForm = document.getElementById("registerForm");

        if (registerForm) {

            console.log("Register form found");
        }

        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            console.log("Allahu ekber");

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const firstName = document.getElementById("first_name").value;
            const lastName = document.getElementById("last_name").value;

            let data = {
                email: email,
                password: password,
                first_name: firstName,
                last_name: lastName,
            };

            if (AuthService.validateEmail(email) == null) {
                console.log("Invalid email xd");

            } else {
                $.ajax({
                    url: "http://localhost/Armen-Mili-Web-Project/backend/auth/register",
                    type: "POST",
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    success: function (res) {
                        console.log(res);
                        console.log(data);

                        window.location.href = "#view_login";
                    },
                    error: function (err) {
                        console.log(err);

                    },
                });
            }
        });
    },

    validateEmail: function (email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    },

    login: function () {
        console.log("Logging in user...");

        const LoginForm = document.getElementById("loginForm");

        LoginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            console.log("Login form submitted.");

            const email = document.getElementById("email-login").value;
            const password = document.getElementById("password-login").value;

            const loginData = {
                email: email,
                password: password,
            };

            $.ajax({
                url: "http://localhost/Armen-Mili-Web-Project/backend/auth/login",
                type: "POST",
                data: JSON.stringify(loginData),
                contentType: "application/json",
                success: function (res) {
                    console.log(res);
                    localStorage.setItem("user_token", res.data.user_token);
                    window.location.href = "#view_main";
                },
                error: function (err) {
                    console.log(err);
                },
            });
        });
    },

    logOut: function () {
        localStorage.removeItem("user_token");

        NavbarService.renderNavbar();
    },
};
