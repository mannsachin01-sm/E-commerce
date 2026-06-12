const Order = require( "../models/order_model" );
const product_model = require( "../models/product_model" );

exports.createOrder = async ( req, res ) => {
    const { userId, products, totalAmount } = req.body;

    try {
        const orderProducts = await Promise.all(
            products.map( async ( item ) => {
                const product = await product_model.findById( item.product._id ); // Validate product existence
                if ( !product ) {
                    throw new Error( `Product with ID ${item.product._id} not found` );
                }

                // Check if stock is sufficient
                if ( product.stock < item.quantity ) {
                    throw new Error( `Insufficient stock for product ${product.name}` );
                }
                // Return the product info required for the order
                return {
                    productId: product._id,
                    quantity: item.quantity,
                };
            } )
        );

        // Create new order after validation
        const newOrder = new Order( {
            user: userId,
            products: orderProducts,
            totalAmount: totalAmount,
            orderStatus: "pending",
            paymentStatus: "pending",
        } );

        // Save the order in the database
        const savedOrder = await newOrder.save();

        res.status( 201 ).json( savedOrder );
    } catch ( error ) {
        res.status( 500 ).json( { message: "Error creating order", error } );
    }
};

exports.getAllOrders = async ( req, res ) => {
    try {
        const orders = await Order.find()
            .populate( "user" )
            .populate( "products.productId" );
        res.status( 200 ).json( orders );
    } catch ( error ) {
        res.status( 500 ).json( { message: "Error fetching orders", error } );
    }
};

exports.getOrderById = async ( req, res ) => {
    const { id } = req.params;

    try {
        const order = await Order.findById( id )
            .populate( "user" )
            .populate( "products.productId" );

        if ( !order ) {
            return res.status( 404 ).json( { message: "Order not found" } );
        }

        res.status( 200 ).json( order );
    } catch ( error ) {
        res.status( 500 ).json( { message: "Error fetching order", error } );
    }
};

exports.deleteOrder = async ( req, res ) => {
    const { id } = req.params;

    try {
        const order = await Order.findById( id );

        if ( !order ) {
            return res.status( 404 ).json( { message: "Order not found" } );
        }

        await Order.findByIdAndDelete( id );

        res.status( 200 ).json( { message: "Order deleted successfully" } );
    } catch ( error ) {
        res.status( 500 ).json( { message: "Error deleting order", error } );
    }
};

exports.updateOrderStatus = async ( req, res ) => {
    const { id } = req.params;
    const { orderStatus } = req.body;

    try {
        const order = await Order.findById( id );
        order.orderStatus = orderStatus;
        await order.save();
        res
            .status( 200 )
            .json( { message: "Order status updated successfully", order } );
    } catch ( error ) {
        res.status( 500 ).json( { message: "Failed to update order status", error } );
    }
};
