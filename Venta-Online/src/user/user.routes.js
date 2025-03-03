import { Router } from "express"
import { 
    putUser, 
    deleteUser,
    getUsers,
    getUserId,
    deleteProfile,
    updateProfile
} from "./user.controller.js"
import { validateJwt, isAdmin, isClient } from '../../middlewares/validate.jwt.js'
import { updateProf, updateValidator } from "../../middlewares/validators.js"


const api = Router()

//Admin Routes
api.delete('/delete/:id', [validateJwt, isAdmin], deleteUser)
api.get('/', [validateJwt, isAdmin], getUsers)
api.get('/:id', [validateJwt, isAdmin], getUserId)
api.put('/update/:id', [validateJwt, updateValidator, isAdmin], putUser)

//Client Routes
api.delete('/deleteProfile', [validateJwt, isClient], deleteProfile)
api.put('/updateProfile', [validateJwt, updateProf, isClient], updateProfile)



//Exporto las rutas
export default api