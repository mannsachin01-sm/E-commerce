const express = require("express");
const {getUser, getUserById, signup, login, createContact, updateAccount, forget, deleteUser} = require("../controller/userController");

const router = express.Router()

router.get('/getAllUsers',getUser);
router.get('/:id',getUserById);
router.post('/signup', signup);
router.post('/login',login);
router.post('/forgot-password',forget);
router.put('/account',updateAccount);
router.post('/contact',createContact);
router.delete('/delete/:id', deleteUser);

module.exports = router
