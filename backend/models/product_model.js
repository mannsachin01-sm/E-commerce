const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Reference to the User model
        rating: { type: Number, required: true, min: 1, max: 5 },  // Rating out of 5
        comment: { type: String, required: true },  // Review comment
    },
    { timestamps: true }
);

const productSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        description:{type:String,required:true},
        price:{type:Number,required:true},
        category:{type:String,required:true},
        brand:{type:String,required:true},
        image:{type:String},
        stock:{type:Number,required:true},
        reviews: [reviewSchema],
        averageRating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
    },
    { timestamps: true }
);
// Pre-save hook to calculate the average rating
productSchema.pre("save", function (next) {
    if (this.reviews.length > 0) {
        this.averageRating =
            this.reviews.reduce((acc, review) => acc + review.rating, 0) / this.reviews.length;
        this.numReviews = this.reviews.length;
    } else {
        this.averageRating = 0;
        this.numReviews = 0;
    }
    next();
});

module.exports = mongoose.model('Products',productSchema)