import Cart from './cart.model.js'
import Product from '../product/product.model.js'

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body
        const userId = req.user.uid

        const product = await Product.findById(productId)
        if (!product) return res.status(404).send({ message: 'Product not found' })

        let cart = await Cart.findOne({ user: userId })

        if (!cart) {
            cart = new Cart({ user: userId, products: [] })
        }

        const itemIndex = cart.products.findIndex(p => p.product.toString() === productId)

        if (itemIndex > -1) {
            cart.products[itemIndex].quantity += quantity
        } else {
            cart.products.push({ product: productId, quantity })
        }

        await cart.save()
        res.send({ message: 'Product added to the cart', cart })

    } catch (error) {
        console.error("General Error:", error)
        res.status(500).send({ message: "General Error", error })
    }
}

export const getCart = async (req, res) => {
    try {
        const userId = req.user.uid
        const cart = await Cart.findOne({ user: userId }).populate('products.product')
        
        if (!cart) return res.status(404).send({ message: 'Cart is empty' })

        res.send(cart)
    } catch (error) {
        console.error("General Error", error)
        res.status(500).send({ message: "General Error", error })
    }
}
