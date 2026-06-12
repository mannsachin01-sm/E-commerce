const mongoose = require( "mongoose" );

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true },
        phone: { type: String, unique: true },
        address: {
            state: { type: String, trim: true },
            city: { type: String, trim: true },
            streetAddress: { type: String, trim: true },
        },
        message: [ { type: String, trim: true } ],
        isAdmin: { type: String, default: false },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model( "User", userSchema );
