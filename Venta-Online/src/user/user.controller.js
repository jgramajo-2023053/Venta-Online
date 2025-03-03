import User from './user.model.js'
import { checkPassword } from '../../utils/encryp.js'


// -------------- ADMIN --------------
//update user
export const putUser = async(req, res)=>{
    try {
        let id = req.params.id
        let data = req.body
        
        let user = await User.findById(id) 
        if (user.id === '65a123456789abcdef123456') 
            return res.status(400).send({ message: 'You cannot Update this user' });

        if (user.role === 'ADMIN') 
            return res.status(400).send({ message: 'You cannot Update a user with ADMIN role' });

        let user2 = await User.findByIdAndUpdate(id, data, {new: true})
       
        if(!user2) return res.status(404).send({message: 'user not found'})
        return res.send({message: 'User found: ', user2})
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({message: 'General error', err})
    }
}

//delete user
export const deleteUser = async(req, res)=>{
    try{
        let { id } = req.params
        let {password} = req.body

        const admin = await User.findById(req.user.uid)
        if(!admin) return res.status(404).send({message: 'Admin not found'})

        const samePass = await checkPassword(admin.password, password)
        if (!samePass) return res.status(400).send(
            {
                message: 'Incorrect password' 
            }
        ) 

        let user = await User.findById(id) 
        if (user.id === '65a123456789abcdef123456') 
            return res.status(400).send({ message: 'You cannot delete this user' });

        if (user.role === 'ADMIN') 
            return res.status(400).send({ message: 'You cannot delete a user with ADMIN role' });

        // Si pasó todas las validaciones, eliminar el usuario
        let user2 = await User.findByIdAndDelete(id);
        return res.send({ message: 'User Deleted: ', id });
    }catch(err){
        console.error('General error', err)
        return res.status(500).send({message: 'General error', err})
    }
}

//get Users
export const getUsers = async(req, res)=>{
    try{
        let user = await User.find()
        if(user.length === 0) return res.status(404).send({message: 'Users is empty'})
        return res.send({message: 'Users founded: ', user})
    }catch(err){
        console.error('General error', err)
        return res.status(500).send({message: 'General error', err})
    }
}

//get one User
export const getUserId = async(req, res)=>{
    try{
        let id = req.params.id
        let user = await User.findById(id)
        if(!user) return res.status(404).send({message: 'User not found'})
        return res.send({message: 'User founded: ', user})
    }catch(err){
        console.error('General error', err)
        return res.status(500).send({message: 'General error', err})
    }
}




// -------------- CLIENT --------------
// Eliminar perfil
export const deleteProfile= async(req, res)=>{
    try{
        let { uid } = req.user
        let { password } = req.body
        let user = await User.findById(uid)
        if (!user) return res.status(404).send({message: 'User not found'})
        
        const samePass = await checkPassword(user.password, password)
        if (!samePass) return res.status(400).send(
            {
                message: 'Incorrect password' 
            }
         ) 
        let user2 = await User.findByIdAndDelete(uid)
        if(!user2) return res.status(404).send({message: 'User not found'})
        return res.send({message: 'User Deleted: ', uid})
    }catch(err){
        console.error('General error', err)
        return res.status(500).send({message: 'General error', err})
    }
}

// Editar perfil
export const updateProfile = async (req,res) => {
    try {
        let {uid} = req.user
        let data = req.body

        let profile = await User.findByIdAndUpdate(uid, data, {new: true})
        
        return res.send(
            {
                message: 'Your profile is updated',
                profile
            }
        )
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({message: 'General error', err})
    }
}