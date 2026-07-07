import express from "express";
import connection from "./api/database/db.js" ;
import environments from "./api/config/environments.js";
import cors from "cors";
import productRoutes from "./api/routes/product.routes.js"
import viewRoutes from "./api/routes/view.routes.js"
import session from "express-session";
import authRoutes from "./api/routes/auth.routes.js";
import ventaRoutes from "./api/routes/venta.routes.js";

const { port, session_key } = environments;
const app = express();
const PORT = port;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: session_key,
        resave: false,
        saveUninitialized: false
    })
);

app.set("view engine", "ejs");
app.set("views", "./src/views");

// Servimos los archivos publicos desde la carpeta public
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.use("/api/products", productRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/admin", viewRoutes);
app.use("/", authRoutes);