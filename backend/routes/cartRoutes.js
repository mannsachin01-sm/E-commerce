const express = require("express");
const {getCartItems, addCartItem, removeCartItem, increaseQuantity, decreaseQuantity} = require("../controller/cartController");


const router = express.Router()

router.post('/', addCartItem);
router.get('/:id', getCartItems);
router.delete('/:userId/item/:productId', removeCartItem);
router.patch('/:userId/item/:productId/increase', increaseQuantity);
router.patch('/:userId/item/:productId/decrease', decreaseQuantity);


module.exports = router
