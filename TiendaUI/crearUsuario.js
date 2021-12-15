window.addEventListener('load', (event) => {

    const baseUrl = 'http://localhost:51740/api';

    function create(event) {
        debugger;
        console.log(event.currentTarget);
        event.preventDefault();
        const url = `${baseUrl}/auth/User`;
        var data = {
            Email: event.currentTarget.email.value,
            Password: event.currentTarget.password.value,
            ConfirmPassword: event.currentTarget.confirmPassword.value,
            Role: event.currentTarget.role.value,
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
                        window.location.href = "index.html";
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
    document.getElementById("create-team-form-frm").addEventListener("submit", create);
});