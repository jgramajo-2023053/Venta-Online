import { Router } from "express"
import { 
    putUser, 
    deleteUser,
    getUsers,
    getUserId,
    deleteProfile
} from "./user.controller.js"
import { validateJwt, isAdmin, isClient } from '../../middlewares/validate.jwt.js'
import { updateValidator, registerValidator } from "../../middlewares/validators.js"


const api = Router()

//Admin Routes
api.delete('/delete/:id', [validateJwt, isAdmin], deleteUser)
api.get('/', [validateJwt, isAdmin], getUsers)
api.get('/:id', [validateJwt, isAdmin], getUserId)
api.put('/update/:id', [validateJwt, updateValidator, isAdmin], putUser)

//Client Routes
api.delete('/deleteProfile/:id', [validateJwt, isClient], deleteProfile)



//Exporto las rutas
export default api