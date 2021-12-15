const baseRawUrl = 'http://localhost:51740';
const baseUrl = `${baseRawUrl}/api`;
window.addEventListener('load', (event) => {
    if (!Boolean(sessionStorage.getItem("jwt"))) {
        window.location.href = "../Login.html";
    }


    function fetchTeams() {
        debugger;
        const url = `${baseUrl}/Categorias/${sessionStorage.getItem("id")}/Productos/${sessionStorage.getItem("idProducto")}`;
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
                    const imageUrl = data.imagePath ? `${baseRawUrl}/${data.imagePath}` : "";
                    let productoLi = `
                            <label for="name">Producto</label>
                            <input type="text" name="name" placeholder="${data.name}">
                            <label for="price">Price</label>
                            <input type="number" name="price" placeholder="${data.price}">
                            <label for="stock">Stock</label>
                            <input type="number" name="stock"  placeholder="${data.stock}">
                            <label for="dueDate">Due Date</label>
                            <input type="text" name="dueDate" placeholder="${data.dueDate}" onfocus="(this.type='date')">
                            <label for="description">Description</label>
                            <input type="text" name="description" placeholder="${data.description}">
                            <label for="Image">Image</label>
                            <label><div class="cover cover-small" style="background-image: url(${imageUrl}); width=100px; height:100px;" ></div><label>
                            <input type="file" name="image" id=>
                            <input type="submit" value="submit">`;
                    var Content = `<form id="create-team-form-frm" class="d-flex justify-content-center align-items-center flex-column bd-highlight">${productoLi}</form>`;
                    document.getElementById('actualizar').innerHTML = Content;
                    document.getElementById("create-team-form-frm").addEventListener("submit", fetchUpdate);
                } else {
                    alert(data);
                }
            });
    }

    function fetchUpdate(event) {
        debugger;
        const url = `${baseUrl}/Categorias/${sessionStorage.getItem("id")}/Productos/${sessionStorage.getItem("idProducto")}/form`;
        event.preventDefault();

        const formData = new FormData();
        formData.append('Name', event.currentTarget.name.value);
        formData.append('Price', event.currentTarget.price.value);
        formData.append('Stock', event.currentTarget.stock.value);
        formData.append('DueDate', event.currentTarget.dueDate.value);
        formData.append('Description', event.currentTarget.description.value);
        formData.append('Image', event.currentTarget.image.files[0]);
        formData.append('CategoriaId', sessionStorage.getItem("idCategoria"));
        debugger;
        fetch(url, {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("jwt")}` },
            method: 'PUT',
            body: formData
        }).then(response => {
            if (response.status === 201) {
                alert('producto was created');
                window.location.href = "historialProducto.html";
                fetchTeams();
            } else {
                response.text()
                    .then((error) => {
                        alert(error);
                        window.location.href = "historialProducto.html";
                    });
            }
        });
    }

    fetchTeams();
    document.getElementById('create-team-frm').addEventListener('submit', fetchUpdate);
});