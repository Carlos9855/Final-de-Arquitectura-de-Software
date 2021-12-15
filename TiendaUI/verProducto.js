window.addEventListener('DOMContentLoaded', function(event) {
    let teams = [];
    const baseRawUrl = 'http://localhost:51740';
    const baseUrl = `${baseRawUrl}/api`;


    function fetchProducto() {
        debugger;
        const url = `${baseUrl}/Categorias/${sessionStorage.getItem("id")}/Productos/${sessionStorage.getItem("idProducto")}`;
        let status;
        fetch(url, {
                headers: { "Authorization": `Bearer ${sessionStorage.getItem("jwt")}` }
            })
            .then((response) => {
                status = response.status;
                return response.json();
            })
            .then((t) => {
                if (status == 200) {
                    console.log(t)
                    const imageUrl = t.imagePath ? `${baseRawUrl}/${t.imagePath}` : "";
                    let Li = `
                        <div class="row justify-content-center">
                        <div class="woocommerce-product-gallery woocommerce-product-gallery--with-images images">
                            <img src="${imageUrl}" alt="" width="600" height="500">
                        </div>
                        <div class="summary entry-summary card" style="width: 600px;  height:300px; border: 0 !important; ">
                            <h1 class="product_title entry-title nectar-inherit-default">${t.name}</h1>
                            <h3>Bs. ${t.price}</h3>
                            <p>${t.description}</p
                        </div>
                        <div>
                        <select id="product-quantity-select" class="form-field-input form-field-select form-field-filled" aria-label="Cantidad" data-quantity-select="">

                                    <option selected="" value="1">1   UNIDAD </option>
                                    <option value="2">2   UNIDAD </option>
                                    <option value="3">3   UNIDAD </option>
                                    <option value="4">4   UNIDAD </option>
                                    <option value="5">5   UNIDAD </option>
                                    <option value="6">6   UNIDAD </option>
                                    <option value="7">7   UNIDAD </option>
                                    <option value="8">8   UNIDAD </option>
                                    <option value="9">9   UNIDAD </option>
                                    <option value="10+">10+  UNIDAD </option>
                                </select>
                            <button type="button" class="btn btn-success">COMPRAR</button>
                        </div>
                    </div>`;
                    var Content = Li;
                    document.getElementById('producto').innerHTML = Content;
                } else {
                    alert(data);
                }
            });
    }
    fetchProducto();
});