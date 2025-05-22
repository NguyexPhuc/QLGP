document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".sign-in-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Ngăn chặn gửi form mặc định

        const username = document.querySelector(".sign-in-form input[type='text']").value;
        const password = document.querySelector(".sign-in-form input[type='password']").value;

        const users = {
            admin: { password: "admin123", role: "admin" },
            editor: { password: "editor123", role: "editor" },
            member: { password: "member123", role: "member" }
        };

        if (users[username] && users[username].password === password) {
            localStorage.setItem("userRole", users[username].role);
            localStorage.setItem("loggedInUser", username);
            alert("Đăng nhập thành công!");
            window.location.href = "dash.html"; // Chuyển hướng sau khi đăng nhập
        } else {
            alert("Sai tên đăng nhập hoặc mật khẩu!");
        }
    });
});
