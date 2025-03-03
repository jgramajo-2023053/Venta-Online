import { Schema, model, Types } from "mongoose"
import Category from "../category/category.model.js"

const productSchema = Schema(
    {
        name:{
            type: String,
            required: [true, 'Name is required'],
            unique: true
        },
        brand:{
            type: String,
            required: [true, 'Brand is required']
        },
        category:{
            type: Types.ObjectId,
            ref: Category,
            required: [true, 'Category is required']
        },
        price:{
            type: Number,
            required: [true, 'Price is required']
        },
        stock:{
            type: Number,
            required: [true, 'Stock is required']
        },
        exist:{
            type: String,
            uppercase: true,
            enum: ['EXIST','NONE']
        },
        sell:{
            type: Number
        }
    }
)

export default model('Product', productSchema)