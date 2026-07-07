import { Router } from "express";
import { createVenta } from "../controllers/venta.controllers.js";
const router = Router();

router.post("/", createVenta);

export default router;