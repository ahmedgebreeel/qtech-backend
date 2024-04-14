const express = require('express');
const {loginController, registerController, googleController} = require('../controllers/auth.controller');
const router = express.Router();


router.post('/register', registerController);
router.post('/register/google', googleController)
router.post('/login', loginController);









module.exports = router;