//Rutas de autenticación
import { Router } from "express"
import { 
    login,
    registerC,
    registerA
} from "./auth.controller.js"
import { registerValidator } from "../../middlewares/validators.js"


const api = Router()

api.post(
    '/registerC', 
    [
        registerValidator
    ], 
    registerC
)
api.post(
    '/registerA', 
    [
        registerValidator
    ], 
    registerA
)

api.post('/login', login)

//Exporto las rutas
export default api