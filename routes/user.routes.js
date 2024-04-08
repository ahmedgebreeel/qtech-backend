const express = require('express');

const {editPersonalInfo} = require('../controllers/user.controller');
const {protectRoute} = require('../middlewares/protectRoute');

const router = express.Router();


router.post('/edit/personal', protectRoute ,editPersonalInfo)




module.exports = router;