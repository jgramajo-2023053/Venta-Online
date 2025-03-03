import Category from './category.model.js'
import Product from '../product/product.model.js'

//Crear categoria
export const createCategory = async(req, res)=>{
    try {
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send({message: `The category: ${data.name}, is created`})
    } catch (err) {
        console.error(err)
        return res.stautus(500).send({message: 'General Error', err})
    }
}

//Get All
export const viewCategories = async(req, res)=>{
    try {
        let categories = await Category.find()
        if(categories.length === 0) return res.status(404).send({message: 'Categories is empty'})
        return res.send({message: 'Categories found: ', categories})
    } catch (err) {
        console.error(err)
        return res.stautus(500).send({message: 'General Error', err})
    }
}

//Get by Id
export const viewCategory = async(req, res)=>{
    try {
        let { id } = req.params
        let category = await Category.findById(id)
        if(!category) return res.status(404).send({message: 'Category not Found'})
        return res.send({message: 'Category found: ', category})
    } catch (err) {
        console.error(err)
        return res.stautus(500).send({message: 'General Error', err})
    }
}

//Update Category
export const updateCategory = async(req, res)=>{
    try {
        let { id } = req.params
        let data = req.body
        let category = await Category.findById(id)
        if (!category) return res.status(404).send({message: 'Category not found'})
        if (category.id === '65a123456789abcdef123456'){
            res.status(400).send({message: 'You cannot update this Category'})
        }else{
            await Category.findByIdAndUpdate(id, data, {new: true})
            return res.send({message: 'The category is updated'})
        }       
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General Error', err})
    }
}


//Delete Category
export const deleteCategory = async(req, res)=>{
    try {
        let { id } = req.params
        let category = await Category.findById(id)
        if (!category) return res.status(404).send({message: 'Category not found'})
            if (category.id === '65a123456789abcdef123456'){
                res.status(400).send({message: 'You cannot delete this Category'})
            }

            const defaultCategoryId = '65a123456789abcdef123456';
            await Product.updateMany({ category: id }, { category: defaultCategoryId });

            await Category.findByIdAndDelete(id)
            return res.send({message: `${category.name} was deleted`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General Error', err})
    }
}