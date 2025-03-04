import { body } from 'express-validator';
import { validarCampos } from './validar-campos.js'

export const loginValidator = [
    body('email').optional().isEmail().withMessage('Enter a valid email address'),
    body('password', 'Password must be at least 8 characters').isLength({min: 8}),
    validarCampos
]