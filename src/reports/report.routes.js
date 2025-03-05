import { Router } from "express";
import { excelCompanies } from "./report.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get(
    '/ExcelReport',
    [
        validarJWT
    ],
    excelCompanies
)

export default router;