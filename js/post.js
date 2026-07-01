const contenedorProductos = document.getElementById("contenedor-productos");
const postProductForm = document.getElementById("postProductForm");

postProductForm.addEventListener("submit", async event => {
    event.preventDefault(); // Detenemos el envío por defecto del formulario
    console.log("formulario no enviado")

    /* Obtenemos la data del formulario:

        1. Transformamos la informacion del form en un objeto FormData

        2. Transformamos la info del FormData a un objeto normal JS

        3. Con la info en objetos JS, lo enviamos en el body de la request
    */

    // Obtenemos la info del formulario
    const formData = new FormData(event.target); // Guardamos la info del form en un objeto FormData
    console.log(formData);

    /* Las entradas del FormData son:
        0: name -> "Fernet Branca"
        1: image -> "https://http2.mlstatic.com/D_Q_NP_2X_685551-MLA99433693010_112025-E.webp"
        2: category -> "drink"
        3: price -> "17000"
    */

    // Transformamos este objeto nativo en un objeto JavaScript normal
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    // La idea de esto es poder parsear este objeto como JSON en el body de la peticion
    /*
    {
        "name": "Fernet Branca",
        "image": "https://http2.mlstatic.com/D_Q_NP_2X_685551-MLA99433693010_112025-E.webp",
        "category": "drink",
        "price": "123"
    }
    */

    // Ahora este objeto ya puede enviarse anexado al cuerpo (body) de la peticion HTTP (HTTP Request)
    try {
        const url = "http://localhost:4000/api/products/"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        console.log(response);
        const result = await response.json();
        alert(result.message);

    } catch (error) {
        console.error("Error al crear el producto");
    }

});