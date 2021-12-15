window.addEventListener('DOMContentLoaded', function(event) {

    let teams = [];
    const baseRawUrl = 'http://localhost:51740';
    const baseUrl = `${baseRawUrl}/api`;


    function PostFormTeam(event) {

        
        debugger;
        event.preventDefault();
        let url = `${baseUrl}/Categorias/${sessionStorage.getItem("id")}/Productos/form`;

        if (!event.currentTarget.name.value) {
            event.currentTarget.name.style.backgroundColor = 'red';
            return;
        }

        const formData = new FormData();
        formData.append('Name', event.currentTarget.name.value);
        formData.append('Price', event.currentTarget.price.value);
        formData.append('Stock', event.currentTarget.stock.value);
        formData.append('DueDate', event.currentTarget.dueDate.value);
        formData.append('Description', event.currentTarget.description.value);
        formData.append('Image', event.currentTarget.image.files[0]);
        formData.append('CategoriaId', sessionStorage.getItem("id"));
        debugger;


        fetch(url, {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("jwt")}` },
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.status === 201) {
                alert('product was created');
                window.location.href = "historialProducto.html";
            } else {
                response.text()
                    .then((error) => {
                        alert(error);
                        window.location.href = "historialProducto.html";
                    });
            }
        });
    }
    document.getElementById('create-team-form-frm').addEventListener('submit', PostFormTeam)
});