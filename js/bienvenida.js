const inputNombre = document.getElementById("nombreUsuario");
const botonContinuar = document.getElementById("boton-continuar");
const errorNombre = document.getElementById("error-nombre");

botonContinuar.addEventListener("click", continuarCompra);

inputNombre.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        continuarCompra();
    }
});

inputNombre.addEventListener("input", () => {
    if (inputNombre.value.trim() !== "") {
        errorNombre.classList.add("error-oculto");
    }
});

function continuarCompra() {
    const nombre = inputNombre.value.trim();

    if (nombre === "") {
        errorNombre.classList.remove("error-oculto");
        inputNombre.focus();
        return;
    }

    guardarNombreCliente(nombre);

    window.location.href = "productos.html";
}

function guardarNombreCliente(nombre) {
    localStorage.setItem("nombreCliente", nombre);
}