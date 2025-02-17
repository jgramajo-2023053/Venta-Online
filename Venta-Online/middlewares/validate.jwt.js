'use strict'

import jwt from 'jsonwebtoken'

export const validateJwt = async(req, res, next)=>{
    try{
        let secretKey = process.env.SECRET_KEY
        let { authorization } = req.headers

        if(!authorization) return res.status(401).send({message: 'Unauthorized'})
            
        let user = jwt.verify(authorization, secretKey)
        req.user = user
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Invalid credentials'})
    }
}

export const isAdmin = async(req,res,next) =>{
    try {
        const { user } = req
        if(!user || user.role !== 'ADMIN') return res.status(403).send(
            {
                success: false,
                message: `You dont have access | you are not ADMIN`
            }
        )
        next()
    } catch (err) {
        return res.status(403).send(
            {
                success: fake,
                message: 'Error with authorization'
            }
        )
    }
}

export const isClient = async(req,res,next) =>{
    try {
        const { user } = req
        if(!user || user.role !== 'CLIENT') return res.status(403).send(
            {
                success: false,
                message: `You dont have access | you are not CLIENT`
            }
        )
        next()
    } catch (err) {
        return res.status(403).send(
            {
                success: fake,
                message: 'Error with authorization'
            }
        )
    }
}