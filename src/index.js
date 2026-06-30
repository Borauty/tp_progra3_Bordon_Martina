import express from "express";
import connection from "./database/db.js" ;
import environments from "./config/environments.js";

const PORT = environments.port;
const app = express();

app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


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