window.addEventListener('DOMContentLoaded', function(event) {

    let teams = [];
    const baseRawUrl = 'http://localhost:51740';
    const baseUrl = `${baseRawUrl}/api`;


    function PostFormTeam(event) {
        debugger;
        event.preventDefault();
        let url = `${baseUrl}/Categorias/form`;

        if (!event.currentTarget.name.value) {
            event.currentTarget.name.style.backgroundColor = 'red';
            return;
        }

        const formData = new FormData();
        formData.append('Name', event.currentTarget.name.value);
        formData.append('Image', event.currentTarget.image.files[0]);
        debugger;


        fetch(url, {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("jwt")}` },
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.status === 201) {
                alert('categoria was created');
                window.location.href = "historial.html";
                fetchTeams();
            } else {
                response.text()
                    .then((error) => {
                        alert(error);
                        window.location.href = "historial.html";
                    });
            }
        });
        fetchTeams();
    }
    document.getElementById('create-team-form-frm').addEventListener('submit', PostFormTeam)
});