const express = require("express");
const productController = require( "../controller/productsController" );


const router = express.Router()

router.get('/',productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

router.post("/:id/review/:userId", productController.addReview);
router.get("/:id/reviews", productController.getProductReviews);
router.delete("/:productId/review/:reviewId", productController.deleteReview);

module.exports = router
