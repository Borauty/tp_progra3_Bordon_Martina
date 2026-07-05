const contenedorTicket = document.getElementById("ticket");
const descargarPdfButton = document.getElementById("descargar-pdf");
const salirTicketButton = document.getElementById("salir-ticket");

function renderTicket() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const nombre = localStorage.getItem("nombreUsuario") || "Cliente";

    document.getElementById("ticketUsuario").textContent = nombre;
    document.getElementById("ticketFecha").textContent = new Date().toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    let total = 0;
    let html = "";

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        html += `
            <div class="ticket-item">
                <span>${producto.nombre} x${producto.cantidad}</span>
                <span>$${subtotal}</span>
            </div>
        `;
    });

    document.getElementById("ticketProductos").innerHTML = html;
    document.getElementById("ticketTotal").textContent = `Total: $${total}`;
}

descargarPdfButton.addEventListener("click", () => {
    window.print();
});

salirTicketButton.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    localStorage.removeItem("nombreUsuario");
    window.location.href = "index.html";
});

renderTicket();