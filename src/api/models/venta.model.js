import connection from "../database/db.js";

const insertVenta = (total) => {
    const sql = "INSERT INTO ventas (total) VALUES (?)";
    return connection.query(sql, [total]);
}

const insertDetalle = (venta_id, producto_id, cantidad, precio_unitario) => {
    const sql = "INSERT INTO venta_detalle (venta_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)";
    return connection.query(sql, [venta_id, producto_id, cantidad, precio_unitario]);
}

export default {
    insertVenta,
    insertDetalle
}