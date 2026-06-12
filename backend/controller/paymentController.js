const Stripe = require('stripe');
const Payment = require('../models/payment_model');
const Order = require('../models/order_model');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const validCountries= [
    'AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ'
];
const isValidCountryCode = (code) => {
    return validCountries.includes(code);
};
exports.processPayment = async (req, res) => {
    const { orderId, products, amount, address, currency, paymentMethod } = req.body;
    // console.log(products)

    try {
        // Find the order
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (!address) throw new Error("Address not provided");

        const { country } = address;
        // const currency = "USD";
        const isAddressOutsideUSA = country !== "US";

        if (!isValidCountryCode(country)) {
            throw new Error(`Invalid country code: ${country}`);
        }
        if (currency !== "USD" && !isAddressOutsideUSA) {
            throw new Error("Non-USD transactions in the USA must have shipping/billing address outside the USA");
        }

        const line_items = await Promise.all(products.map(async (item) => {
            let imageUrl = item.product.image;
        
            if (imageUrl && imageUrl.length > 2048) {
                throw new Error("Image url size must be less than 2048");
            }
        
            return {
                price_data: {
                    currency: currency,
                    product_data: {
                        name: item.product.name,
                        description: item.product.description,
                        images: imageUrl ? [imageUrl] : [], // Only include shortened image URL if valid
                    },
                    unit_amount: item.product.price * 100, // Amount in cents
                },
                quantity: item.quantity,
            };
        }));
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${process.env.PAYMENT_SUCCESS_URL}`,
            cancel_url: process.env.PAYMENT_CANCEL_URL,
            shipping_address_collection: {
                allowed_countries: isAddressOutsideUSA ? [country] : ["US"],
            },
        });        

        // Create and save the payment record
        const newPayment = new Payment({
            orderId,
            paymentId: session.id,
            amount,
            currency,
            paymentMethod,
            status: session.payment_status || 'pending',
        });

        await newPayment.save();

        // Update order status
        order.paymentStatus = session.payment_status === 'succeeded' ? 'paid' : 'failed';
        await order.save();

        res.status(200).json({ message: 'Payment processed successfully', newPayment, "session":session });
    } catch (error) {
        if (error.type === 'StripeCardError') {
            res.status(400).json({ message: 'Card error', error });
        } else {
            res.status(500).json({ message: 'Error processing payment', error });
        }
    }
};


exports.deletePayment = async (req, res) => {
    const { id } = req.params;

    try {
        const payment = await Payment.findById(id);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        await Payment.findByIdAndDelete(id);

        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting payment', error });
    }
};
