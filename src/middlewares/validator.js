import { body } from 'express-validator';
import { existenteEmail, existentePhone } from '../helpers/db-validator.js';
import { validarCampos } from './validar-campos.js'

export const loginValidator = [
    body('email').optional().isEmail().withMessage('Enter a valid email address'),
    body('password', 'Password must be at least 8 characters').isLength({min: 8}),
    validarCampos
]

export const registerValidator = [
    body('name', 'The name is required').not().isEmpty(),
    body('impactLevel', 'The impact level is required').not().isEmpty(),
    body('yearsOfExperience', 'The years of experience are required').not().isEmpty(),
    body('category', 'The category is required').not().isEmpty(),
    body('description', 'The description is required').not().isEmpty(),
    body('phone', 'The phone is required').not().isEmpty(),
    body('phone').custom(existentePhone),
    body('email', 'You must enter a valid email').isEmail(),
    body('email').custom(existenteEmail),
    body('representative', 'The representative required').not().isEmpty(),
    validarCampos
];