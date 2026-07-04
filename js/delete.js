const contenedorProductos = document.getElementById("contenedor-productos");
<<<<<<< HEAD
const getProductForm = document.getElementById("FormularioEliminar");
=======
const getProductForm = document.getElementById("getProductForm");
>>>>>>> 3ea33db7302a3e02a2c144ae0cecdb4e65c9bf50

getProductForm.addEventListener("submit", async event => {
    event.preventDefault(); // Evitamos el envío por defecto del formulario

    // Extraemos el id del producto
    const idProd = event.target.idProd.value.trim();

    try {
        // Buscamos el producto por su ID
        const response = await fetch(
            `http://localhost:4000/api/products/${idProd}`
        );

        const datos = await response.json();

        // Si el servidor responde un error
        if (!response.ok) {
            alert(datos.message || "No se encontró el producto");
            return;
        }

        const producto = datos.payload;

        console.log(producto);

        renderizarProducto(producto);

    } catch (error) {
        console.error("Error al obtener el producto:", error);
        alert("Ocurrió un error al buscar el producto");
    }
});


function renderizarProducto(producto) {
    const htmlProducto = `
        <ul>
            <li class="lista-producto">
                <img src="${producto.image}" alt="${producto.name}">

                <p>
                    Id: ${producto.id} /
                    Nombre: ${producto.name} /
                    <strong>Precio: $${producto.price}</strong>
                </p>

                <input 
                    type="button" 
                    id="deleteProduct-button" 
                    value="Eliminar Producto"
                >
            </li>
        </ul>
    `;

    contenedorProductos.innerHTML = htmlProducto;

    // Buscamos el botón recién creado
    const deleteProductButton = document.getElementById("deleteProduct-button");

    deleteProductButton.addEventListener("click", async event => {
        event.stopPropagation();

        const confirmacion = confirm("¿Querés eliminar este producto?");

        // Solo elimina si toca "Aceptar"
        if (confirmacion) {
            await eliminarProducto(producto.id);
        }
    });
}


async function eliminarProducto(id) {
    try {
        const response = await fetch(
            `http://localhost:4000/api/products/${id}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (response.ok) {
            alert(result.message || "Producto eliminado correctamente");

            // Quitamos el producto de la pantalla
            contenedorProductos.innerHTML = "";

        } else {
            console.error("Error:", result.message);
            alert(result.message || "No se pudo eliminar el producto");
        }

    } catch (error) {
        console.error("Error en la solicitud DELETE:", error);
        alert("Ocurrió un error al eliminar el producto");
    }
}