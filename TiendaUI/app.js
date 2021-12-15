window.addEventListener('DOMContentLoaded', function(event) {
    let teams = [];
    const baseRawUrl = 'http://localhost:51740';
    const baseUrl = `${baseRawUrl}/api`;
    const role = sessionStorage.getItem("Role")

    function fetchCategoria() {
        debugger;
        console.log(role);
        const url = `${baseUrl}/Categorias`;
        let status;
        fetch(url, {
                headers: { "Authorization": `Bearer ${sessionStorage.getItem("jwt")}` }
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
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mt-2 mr-5">
                           <div class="card mt-5 mb-5" style="width: 18rem;">
                                <div class="cover cover-small" style="background-image: url(${imageUrl})"></div>
                                <div class="card-body">
                                    <h2 class="card-title">${t.name}</h2>
                                    <div class=" d-flex justify-content-center align-items-center flex-column bd-highlight ">
                                        <a onclick="verProducto(${t.id});" class="btn btn-primary">Ver mas</a>
                                    </div>
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
    fetchCategoria();
});

function verProducto(id) {
    sessionStorage.setItem("id", id);
    window.location.href = "producto.html";
}

function crud() {
    window.location.href = "historial.html";
}