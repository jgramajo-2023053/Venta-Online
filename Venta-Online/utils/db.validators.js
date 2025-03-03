//Validar datos relacionados a la DB
import Category from '../src/category/category.model.js'
import User from '../src/user/user.model.js'
import Product from '../src/product/product.model.js'

export const existEmail = async(email, user)=>{
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail && alreadyEmail._id != user._id){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const notRequiredField = (field)=>{
    if(field){
        throw new Error(`${field} is not Required`)
    }
}

export const oneCategory = async(name, category)=>{
    const alreadyName = await Category.findOne({name})
    if(alreadyName && alreadyName._id != category._id){
        console.error(`The category, ${name}, is already exists`)
        throw new Error(`The categoryy, ${name}, is already exists`)
    }
}

export const oneName = async(name, product)=>{
    const alreadyName = await Product.findOne({name})
    if(alreadyName && alreadyName._id != product._id){
        console.error(`The product, ${name}, is already exists`)
        throw new Error(`The product, ${name}, is already exists`)
    }
}