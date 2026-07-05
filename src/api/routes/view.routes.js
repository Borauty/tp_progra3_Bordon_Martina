import { Router } from "express";
import { renderAdmin, renderGet, renderPost, renderPut, renderDelete } from "../controllers/view.controllers.js";

const router = Router();

router.get("/", renderAdmin);
router.get("/consultar", renderGet);
router.get("/crear", renderPost);
router.get("/modificar", renderPut);
router.get("/eliminar", renderDelete);

export default router;