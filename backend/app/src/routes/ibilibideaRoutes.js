import express from "express";
import * as iC from "../controllers/ibilbideaController.js";

const router = express.Router();

router.get("/user/:idUser", iC.getUserrenIbilbideak);
router.post("/add", iC.createNewIbilbidea);
router.delete("/delete/:idIbilbidea", iC.deleteIbilbidea);
export default router;