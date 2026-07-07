import ventaModel from "../models/venta.model.js";

export const createVenta = async (req, res) => {
    try {
        const { carrito } = req.body;

        if (!Array.isArray(carrito) || carrito.length === 0) {
            return res.status(400).json({
                message: "El carrito esta vacio o no es valido"
            });
        }

        let total = 0;
        carrito.forEach(item => {
            total += item.precio * item.cantidad;
        });

        const [resultVenta] = await ventaModel.insertVenta(total);
        const venta_id = resultVenta.insertId;

        for (const item of carrito) {
            await ventaModel.insertDetalle(venta_id, item.id, item.cantidad, item.precio);
        }

        res.status(201).json({
            message: "Venta registrada correctamente",
            venta_id: venta_id
        });
    } catch (error) {
        console.error("Error al registrar la venta:", error.message);
        res.status(500).json({
            message: "Error interno al registrar la venta"
        });
    }
};