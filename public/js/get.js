const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("formularioConsultar");

getProductForm.addEventListener("submit", async event => {
    event.preventDefault(); //Evitamos el envío por defecto HTML del formulario

    // Extraemos el id del producto
    const idProd = event.target.idProd.value.trim();

    try {
        // Vamos a hacer el fetch a una URL personalizada
        const response = await fetch(`http://localhost:4000/api/products/${idProd}`);

        if (response.status === 404) {
            contenedorProductos.innerHTML = "<p>No se encontró ningún producto con ese id.</p>";
            return;
        }

        // Procesamos los datos que devuelve el servidor
        const datos = await response.json();

        const producto = datos.payload;

        console.log(producto);
        

        renderizarProducto(producto);

    } catch (error) {
        console.error("Error al obtener el producto");
        contenedorProductos.innerHTML = "<p>Ocurrió un error al consultar el producto.</p>";
    }
});

function renderizarProducto(producto) {
    let htmlProducto = `
        <ul>
            <li class="lista-producto">
                <img src="${producto.image}" alt="${producto.name}">
                <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong></p>
            </li>
        </ul>
    `;

    contenedorProductos.innerHTML = htmlProducto;
}