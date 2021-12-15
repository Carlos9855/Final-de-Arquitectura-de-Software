const baseRawUrl = 'http://localhost:51740';
const baseUrl = `${baseRawUrl}/api`;
window.addEventListener('load', (event) => {
    if (!Boolean(sessionStorage.getItem("jwt"))) {
        window.location.href = "../Login.html";
    }


    function fetchTeams() {
        debugger;
        const url = `${baseUrl}/Categorias/${sessionStorage.getItem("idCategoria")}`;
        let status;
        if(sessionStorage.getItem("Role") == "Admin"){
            fetch(url, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
                }
            })
            .then((response) => {
                status = response.status;
                return response.json();
            })
            .then((data) => {
                if (status == 200) {
                    console.log(data)
                    const imageUrl = data.imagePath ? `${baseRawUrl}/${data.imagePath}` : "";
                    let teamsLi = `
                            <label for="name">Categoria</label>
                            <input type="text" name="name" placeholder="${data.name}">
                            <label for="Image">Image</label>
                            <label><div class="cover cover-small" style="background-image: url(${imageUrl})"></div><label>
                            <input type="file" name="image" id=>
                            <label for="space"></label>
                            <input type="submit" value="submit">`;
                    var Content = `<form id="create-team-form-frm" class="d-flex justify-content-center align-items-center flex-column bd-highlight">${teamsLi}</form>`;
                    document.getElementById('actualizar').innerHTML = Content;
                    document.getElementById("create-team-form-frm").addEventListener("submit", fetchUpdate);
                } else {
                    alert(data);
                }
            });
        }
        else{
            window.location.href = "prueba.html";
        }
    }

    function fetchUpdate(event) {
        debugger;
        const url = `${baseUrl}/Categorias/${sessionStorage.getItem("idCategoria")}/form`;
        event.preventDefault();

        const formData = new FormData();
        formData.append('Name', event.currentTarget.name.value);
        formData.append('Image', event.currentTarget.image.files[0]);
        debugger;
        fetch(url, {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("jwt")}` },
            method: 'PUT',
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
    }

    fetchTeams();
    document.getElementById('create-team-frm').addEventListener('submit', fetchUpdate);
});