const baseRawUrl = 'http://localhost:51740';
const baseUrl = `${baseRawUrl}/api`;
window.addEventListener('DOMContentLoaded', function(event) {
    let teams = [];

    function fetchTeams() {
        debugger;
        const url = `${baseUrl}/Categorias/${sessionStorage.getItem("id")}/Productos`;
        let status;
        if(sessionStorage.getItem("Role")=="Admin"){
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
                    let Li = data.map(t => {
                        const imageUrl = t.imagePath ? `${baseRawUrl}/${t.imagePath}` : "";
                        return `
                        <tr>
                        <th scope="row">${t.id}</th>
                        <td>${t.name}</td>
                        <td>Bs.- ${t.price}</td>
                        <td>${t.stock}</td>
                        <td>${t.dueDate}</td>
                        <td>${t.description}</td>
                        <td>
                        <div class="cover cover-small" style="background-image: url(${imageUrl})"></div></td>
                        <td><button type="button" class="btn btn-success" onclick="UpdateTeam(${t.id});">Update</button></td>
                        <td><button type="button" class="btn btn-danger" onclick="DeleteTeam(${t.id});">Delete</button></td>
                    </tr>`
                    });
                    var Content = Li.join('');
                    document.getElementById('tableCategoria').innerHTML = Content;
                } else {
                    alert(data);
                }
            });
        }
        else{
            window.location.href = "producto.html";
        }
        
    }
    fetchTeams();
});

function UpdateTeam(id) {
    debugger;
    sessionStorage.setItem("idProducto", id);
    window.location.href = "actualizarProducto.html";
}

function DeleteTeam(id) {
    debugger;
    let teamId = id;
    let url = `${baseUrl}/Categorias/${sessionStorage.getItem("id")}/Productos/${teamId}`;
    fetch(url, {
        headers: { "Authorization": `Bearer ${sessionStorage.getItem("jwt")}` },
        method: 'DELETE'
    }).then((data) => {
        if (data.status === 200) {
            alert('deleted');
        }
    });
    location.reload();
}

function Crear() {
    window.location.href = "CrearProducto.html";
}

function Cambiar(id) {
    debugger;
    window.location.href = "cambiar.html";
}