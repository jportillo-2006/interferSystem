import { Router } from 'express';
import { check } from 'express-validator';
import { existeCompanyById } from '../helpers/db-validator.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { registerCompany, updateCompany } from './company.controller.js';
import { registerValidator } from '../middlewares/validator.js';
import { getCompanies } from './company.controller.js';

const router = Router();

router.get('/', getCompanies);

router.post(
    '/',
    [
        validarJWT,
        registerValidator
    ],
    registerCompany
)

router.put(
    '/:id',
    [
        validarJWT,
        check('id').custom(existeCompanyById),
        validarCampos
    ],
    updateCompany
)

export default router;