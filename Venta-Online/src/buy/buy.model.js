import { Schema, model, Types } from 'mongoose'

const buySchema = new Schema(
    {
        user: { 
            type: Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
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
                },
                price: { 
                    type: Number, 
                    required: true 
                }
            }
        ],
        total: { 
            type: Number, 
            required: true 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    }
)

export default model('Buy', buySchema)
