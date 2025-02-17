import { Schema, model } from 'mongoose'

const categorySchema = Schema(
    {
        name:{
            type: String,
            required: [true, "Name is required"]
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        }
    },
    {timestamps: true}
)

export default model('Category', categorySchema)