import { Schema, model, Types } from 'mongoose'

const cartSchema = new Schema(
    {
        user: { type: Types.ObjectId, ref: 'User', required: true },
        products: [
            {
                product: { 
                    type: Types.ObjectId, 
                    ref: 'Product', 
                    required: true 
                },
                quantity: { 
                    type: Number, 
                    required: true, 
                    min: 1 
                }
            }
        ]
    }, 
    { timestamps: true }
)

export default model('Cart', cartSchema)