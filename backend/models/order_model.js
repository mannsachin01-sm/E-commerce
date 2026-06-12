const mongoose = require( 'mongoose' );

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        orderStatus: {
            type: String,
            required: true,
            enum: [ 'pending', 'Processing', 'completed', 'canceled' ],
            default: 'pending',
        },
        paymentStatus: {
            type: String,
            enum: [ 'pending', 'paid', 'failed' ],
            default: 'pending',
        },
    },
    { timestamps: true }
);

const Order = mongoose.model( 'Order', orderSchema );

module.exports = Order;
