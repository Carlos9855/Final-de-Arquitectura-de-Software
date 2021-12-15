const baseRawUrl = 'http://localhost:51740';
const baseUrl = `${baseRawUrl}/api`;
window.addEventListener('DOMContentLoaded', function(event) {

    let teams = [];


    function fetchTeams() {
        debugger;
        const url = `${baseUrl}/Categorias/${sessionStorage.getItem("id")}/Productos`;
        let status;
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
                        <div class="card  mb-5 mt-5">
                        <div class="cover cover-small" style="background-image: url(${imageUrl})"></div>
                        <div class="card-body">
                            <h5 class="card-title">${t.name}</h5>
                            <div class="d-flex">
                                <div class="flex-fill mr-2">
                                    <span class="badge badge-info">Bs. ${t.price}</span>
                                </div>
                                <button type="button" class="btn btn-success" onclick="verProducto(${t.id});">INFO</button>
                            </div>
                        </div>
                    </div>`
                    });
                    var Content = Li.join('');
                    document.getElementById('teams-container').innerHTML = Content;
                } else {
                    alert(data);
                }
            });
    }

    fetchTeams();
});

function verProducto(id) {
    debugger;
    sessionStorage.setItem("idProducto", id);
    window.location.href = "verProducto.html";
}



function crud() {
    window.location.href = "historialProducto.html";
}
//https://www.freecodecamp.org/news/a-practical-es6-guide-on-how-to-perform-http-requests-using-the-fetch-api-594c3d91a547/