import { body } from "express-validator"
import { validateErrors, validateErrorsWithoutFiles } from "./validate.errors.js"
import { notRequiredField } from "../utils/db.validators.js"


export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be Strong')
        .isLength({min: 8})
        .withMessage('Password need min 8 characters'),
    validateErrors
]

export const updateValidator = [
    body('name')
        .optional()
        .notEmpty(),
    body('email')
        .optional()
        .notEmpty(),
    body('password')
        .optional()
        .custom(notRequiredField),
    body('role')
        .optional(),
    validateErrorsWithoutFiles
]

export const createCategory = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('description', 'Description cannot be empty')
        .notEmpty(),
    validateErrors
]