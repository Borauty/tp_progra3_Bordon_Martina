import express from "express";
import connection from "./database/db.js" ;
import environments from "./config/environments.js";
import cors from "cors";

const PORT = environments.port;
const app = express();
//Middleware basico para permitir que el servidor pueda recibir y procesar peticiones con contenido en formato JSON
app.use(cors());
//Middleware para parsear a JSON el cuerpo de las solicitudes POST y PUT.
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// GET ALL
app.get("/api/products", async (req, res) =>{

    try {
        const [rows] = await connection.query("SELECT * FROM products")

        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.error("Error obteniendo productos: ", error.message)
    }

})
//GET por ID
app.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await connection.query(
            "SELECT * FROM products WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.status(200).json({
            payload: rows[0]
        });

    } catch (error) {
        console.error("Error obteniendo producto por id: ", error.message);
        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
});

// POST - Crear producto
app.post("/api/products/", async (req, res) => {
    try {
        const { name, image, category, price } = req.body;

        await connection.query(
            "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)",
            [name, image, category, price]
        );

        res.status(201).json({
            message: "Producto creado correctamente"
        });

    } catch (error) {
        console.error("Error al crear el producto: ", error.message);
        res.status(500).json({
            message: "Error al crear el producto"
        });
    }
});

//Delete - Eliminar producto
app.delete("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await connection.query(
            "DELETE FROM products WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            message: `Producto con id ${id} eliminado exitosamente`
        });

    } catch (error) {
        console.error("Error al eliminar producto:", error.message);

        res.status(500).json({
            message: "Error interno al eliminar el producto"
        });
    }
});
// PUT - Actualizar producto
app.put("/api/products", async (req, res) => {

    try {
        // Con el destructuring, recibimos todos los datos del producto
        const { id, name, image, category, price, active } = req.body;

        const sql = "UPDATE products SET name = ?, image = ?, category = ?, price = ?, active = ? WHERE id = ?";

        await connection.query(sql, [name, image, category, price, active, id]);

        return res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.log(error);
    }
});