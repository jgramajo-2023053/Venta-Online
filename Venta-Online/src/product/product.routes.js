import { Router } from 'express'
import {
    addProduct,
    deleteProduct,
    getProducts,
    putProduct
} from './product.controller.js'
import {
    validateJwt,
    isAdmin,
    isClient
} from '../../middlewares/validate.jwt.js'
import { createProduct, updateProduct } from '../../middlewares/validators.js'

const api = Router()

api.post('/addProduct', [validateJwt, createProduct, isAdmin], addProduct)
api.get('/getall', [validateJwt], getProducts)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteProduct)
api.put('/update/:id', [validateJwt, updateProduct, isAdmin], putProduct)

export default api