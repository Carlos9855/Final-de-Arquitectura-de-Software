var data1;
var producto1;
const baseRawUrl = 'http://localhost:51740';
const baseUrl = `${baseRawUrl}/api`;
window.addEventListener('DOMContentLoaded', function(event) {
    let teams = [];

    function fetchCategoria() {
        debugger;
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
                        return `<option value=${t.id} id="${t.id}">${t.name}</option>`
                    });
                    var Content = Li.join('');
                    document.getElementById('country').innerHTML = Content;
                    data1 = data;
                } else {
                    alert(data);
                }
            });
    }

    fetchCategoria();
});

function Categoria1(id) {
    debugger;
    console.log(data1)
    let Li = data1.map(t => {
        if (t.id != id) {
            return `<option value=${t.id} id="${t.id}">${t.name}</option>`
        }
    });
    var Content = Li.join('');
    document.getElementById('teams').innerHTML = Content;

}

function producto(id) {
    debugger;

    const url = `${baseUrl}/Categorias/${id}/Productos`;
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
                    return `<option value=${t.id} id="${t.id}">${t.name}</option>`
                });
                var Content = Li.join('');
                document.getElementById('producto').innerHTML = Content;
                producto1 = data;
            } else {
                alert(data);
            }
        });
}

function cambiarProducto() {
    var pro = document.getElementById("producto").value;
    var categoria = document.getElementById("country").value;
    var newCategoria = document.getElementById("teams").value;
    var producto = producto1.find(t => t.id == pro);
    DeleteTeam(categoria, pro, newCategoria, producto);
}

function DeleteTeam(categoriaId, id, newCategoria, producto) {
    debugger;
    let url = `${baseUrl}/Categorias/${categoriaId}/Productos/${id}`;
    fetch(url, {
        headers: { "Authorization": `Bearer ${sessionStorage.getItem("jwt")}` },
        method: 'DELETE'
    });
    fetchUpdate(newCategoria, producto);
}

function fetchUpdate(newCategoria, producto) {
    debugger;
    const urlPost = `${baseUrl}/Categorias/${newCategoria}/Productos`;
    var data = {
        Name: producto.name,
        Price: producto.price,
        Stock: producto.stock,
        DueDate: producto.dueDate,
        CategoriaId: parseInt(newCategoria),
        Description: producto.description,
        ImagePath: producto.imagePath,
    };
    fetch(urlPost, {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
        },
        method: 'POST',
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.status === 201) {
            console.log("producto created successfuly");
        } else {
            response.text().then((data) => {
                console.log(data);
            });
        }
    }).catch((response) => {
        console.log(data);
    });
}