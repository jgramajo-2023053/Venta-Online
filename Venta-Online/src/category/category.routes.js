import { Router } from "express"
import { 
    createCategory,
    viewCategories,
    viewCategory,
    deleteCategory,
    updateCategory
} from "./category.controller.js"
import { validateJwt, isAdmin } from "../../middlewares/validate.jwt.js"
import { oneCategory } from "../../utils/db.validators.js"

const api = Router()

api.post('/create', [validateJwt, isAdmin], createCategory)

api.get('/viewall', [validateJwt], viewCategories)

api.get('/viewone/:id', [validateJwt, isAdmin], viewCategory)

api.put('/update/:id', [validateJwt, isAdmin], updateCategory)

api.delete('/delete/:id', [validateJwt, isAdmin], deleteCategory)

export default api