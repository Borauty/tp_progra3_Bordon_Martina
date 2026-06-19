let boton_finalizar = document.getElementById("finalizar-compra");
let modal_confirmar = document.getElementById("modal-confirmar");
let boton_confirmar_si = document.getElementById("boton-confirmar-si");
let boton_confirmar_no = document.getElementById("boton-confirmar-no");

boton_finalizar.addEventListener("click", Event => {
    let carrito = traerCarrito();
    if (carrito.length == 0) {
        return;
    }
    modal_confirmar.classList.remove("modal-oculto");
})

boton_confirmar_no.addEventListener("click", Event => {
    modal_confirmar.classList.add("modal-oculto");
})

boton_confirmar_si.addEventListener("click", Event => {
    window.location.href = "ticket.html";
})