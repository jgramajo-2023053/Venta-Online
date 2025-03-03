import Product from './product.model.js'
import Category from '../category/category.model.js'

export const addProduct = async (req, res) => {
    try {
        let data = req.body
        let product = new Product(data)

        product.exist = 'EXIST'
        product.sell = 0

        let category = await Category.findById(product.category)
        if(!category) {
            res.status(400).send({message: 'You cannot found this category'})
            return
        }

        await product.save()
        return res.send({message: `The product: ${data.name}, added to the inventary`, product})
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({message: 'General error', err})
    }
}

export const putProduct = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let product = await Product.findById(id)
        if(!product) res.status(400).send({message: 'You cannot found this Product'})

        let category = await Category.findById(product.category)
        if(!category) {
           res.status(400).send({message: 'You cannot found this category'})
             return
        }

        await Product.findByIdAndUpdate(id, data, {new: true})
        return res.send({message: 'The product is updated'})

    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({message: 'General error', err})
    }
}

export const getProducts = async (req, res) => {
    try {
        let products = await Product.find()
        if(products.length === 0) return res.status(404).send({message: 'Products is empty'})
            return res.send({message: 'Products found: ', products})
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({message: 'General error', err})
    }
}

export const deleteProduct = async (req, res) => {
    try{
        let { id } = req.params
        let product = await Product.findById(id)

        if (!product){
            res.status(400).send({message: 'You cannot found this Product'})
        }else{
            await Product.findByIdAndDelete(id)
            return res.send({message: `${product.name} was deleted`})
        }
    }catch(err){
        console.error('General error', err)
        return res.status(500).send({message: 'General error', err})
    }
}