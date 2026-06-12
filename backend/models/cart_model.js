const mongoose = require("mongoose")


const cartSchema = new mongoose.Schema(
    {
        userId:{type:mongoose.Types.ObjectId, ref:'User', require:true},
        items:[
            {
                product: { type: mongoose.Types.ObjectId, ref: 'Products', required: true },
                quantity: { type: Number, required: true, default: 1 }
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Cart',cartSchema)