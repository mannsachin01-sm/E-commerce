const Cart = require( "../models/cart_model" );
const Product = require( "../models/product_model" );

const getCartItems = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findOne({ userId: id }).populate('items.product');
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart data', error });
    }
};
const addCartItem = async (req, res) => {
    const { productId, userId } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            cart = new Cart({ userId: userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ product: productId, quantity: 1 });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error });
    }
};

const removeCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        // console.log("DELETE",userId,productId)

        // Find the cart by user ID
        const cart = await Cart.findOne({ userId: userId });
        // console.log("Carts",cart)
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Check if the product exists in the cart
        const productIndex = cart.items.findIndex(item => item._id.toString() === productId);
        // console.log("productIndex",productIndex)
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Remove the product from the items array
        cart.items.splice(productIndex, 1);

        // Save the updated cart
        await cart.save();

        return res.status(200).json({ message: "Product removed from cart successfully", cart });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

const increaseQuantity = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(item => item.product.toString() === productId);
        if (!item) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        item.quantity += 1;

        await cart.save();
        res.status(200).json({ message: 'Quantity increased', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error increasing quantity', error });
    }
};

const decreaseQuantity = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(item => item.product.toString() === productId);
        if (!item) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        if (item.quantity > 1) {
            item.quantity -= 1;
            await cart.save();
            res.status(200).json({ message: 'Quantity decreased', cart });
        } else {
            res.status(400).json({ message: 'Quantity cannot be less than 1' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error decreasing quantity', error });
    }
};

module.exports = { getCartItems, addCartItem, removeCartItem, increaseQuantity, decreaseQuantity };