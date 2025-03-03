import { body } from "express-validator"
import { validateErrors, validateErrorsWithoutFiles } from "./validate.errors.js"
import { notRequiredField, oneName } from "../utils/db.validators.js"


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

export const updateProf = [
    body('name')
        .optional()
        .notEmpty(),
    body('email')
        .optional()
        .notEmpty()
        .isEmail(),
    body('password')
        .optional()
        .custom(notRequiredField),
    body('role')
        .optional()
        .custom(notRequiredField),
    validateErrorsWithoutFiles
]

export const createProduct = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .custom(oneName),
    body('brand', 'Brand cannot be empty')
        .notEmpty(),
    body('category', 'Category cannot be empty')
        .notEmpty(),
    body('price', 'Price cannot be empty')
        .notEmpty(),
    body('stock', 'Stock cannot be empty')
        .notEmpty(),
    body('exist', 'Exist cannot be empty')
        .optional()
        .custom(notRequiredField),
    body('sell', 'Sell cannot be empty')
        .optional()
        .custom(notRequiredField),
    validateErrorsWithoutFiles
]

export const updateProduct = [
    body('name', 'Name cannot be empty')
        .optional()
        .notEmpty()
        .custom(oneName),
    body('brand', 'Brand cannot be empty')
        .optional()
        .notEmpty(),
    body('category', 'Category cannot be empty')
        .optional()
        .notEmpty(),
    body('price', 'Price cannot be empty')
        .optional()
        .notEmpty(),
    body('stock', 'Stock cannot be empty')
        .optional()
        .notEmpty(),
    body('exist', 'Exist cannot be empty')
        .optional()
        .custom(notRequiredField),
    body('sell', 'Sell cannot be empty')
        .optional()
        .custom(notRequiredField),
    validateErrorsWithoutFiles
]