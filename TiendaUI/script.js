window.addEventListener('load', (event) => {

    const baseUrl = 'http://localhost:51740/api';

    function login(event) {
        debugger;
        console.log(event.currentTarget);
        event.preventDefault();
        const url = `${baseUrl}/auth/Login`;

        if (!Boolean(event.currentTarget.userName.value)) {
            var usernameErrorElement = document.getElementById("login-errors");
            usernameErrorElement.textContent = "username is requered"
            usernameErrorElement.style.display = "block"
            return;
        }
        var data = {
            Email: event.currentTarget.userName.value,
            Password: event.currentTarget.password.value
        }
        fetch(url, {
                headers: { "Content-Type": "application/json; charset=utf-8" },
                method: 'POST',
                body: JSON.stringify(data)
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        debugger;
                        sessionStorage.setItem("jwt", data.message);
                        sessionStorage.setItem("Role", data.role);
                        window.location.href = "prueba.html";
                    });
                } else {
                    response.text().then((data) => {
                        debugger;
                        console.log(data);
                    });
                }
            }).catch((response) => {
                debugger;
                console.log(data);
            });
    }
    document.getElementById("login-frm").addEventListener("submit", login);
});

function Usuario() {
    window.location.href = "crearUsuario.html";
}