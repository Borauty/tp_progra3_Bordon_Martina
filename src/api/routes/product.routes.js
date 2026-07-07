import { Router } from "express";
import connection from "../database/db.js" ;
import { getAllProducts, getProductById, createProduct, modifyProduct, removeProduct} from "../controllers/product.controllers.js";
import { validateId, validateProduct } from "../middlewares/middlewares.js";
import { requireLogin } from "../middlewares/middlewares.js";
const router = Router();
// GET ALL
router.get("/", getAllProducts);
//GET por ID
router.get("/:id", validateId, getProductById);
// POST - Crear producto
router.post("/", requireLogin, validateProduct, createProduct);
router.delete("/:id", requireLogin, validateId, removeProduct);
// PUT - Actualizar producto
router.put("/", requireLogin, validateProduct, modifyProduct);
export default router;