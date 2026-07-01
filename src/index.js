import express from "express";
import connection from "./database/db.js" ;
import environments from "./config/environments.js";
import cors from "cors";

const PORT = environments.port;
const app = express();
//Middleware basico para permitir que el servidor pueda recibir y procesar peticiones con contenido en formato JSON
app.use(cors());


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