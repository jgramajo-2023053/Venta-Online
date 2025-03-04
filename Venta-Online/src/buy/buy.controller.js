import Cart from '../cart/cart.model.js'
import Buy from '../buy/buy.model.js'
import Product from '../product/product.model.js'

export const completePurchase = async (req, res) => {
    try {
        const userId = req.user.uid
        const cart = await Cart.findOne({ user: userId }).populate('products.product')

        if (!cart || cart.products.length === 0) {
            return res.status(400).send({ message: 'cart is empty' })
        }

        let totalAmount = 0
        const purchasedProducts = cart.products.map(item => {
            const subtotal = item.quantity * item.product.price
            totalAmount += subtotal
            return {
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            }
        })

        const newBuy = new Buy({
            user: userId,
            products: purchasedProducts,
            total: totalAmount
        })

        await newBuy.save()

        await Cart.findOneAndDelete({ user: userId })

        res.send({ message: 'buy successfull', buy: newBuy })

    } catch (error) {
        console.error("General Error", error)
        res.status(500).json({ message: "General Error", error })
    }
}
