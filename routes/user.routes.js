const express = require('express');

const {editPersonalInfo, editSocialMedia} = require('../controllers/user.controller');
const {protectRoute} = require('../middlewares/protectRoute');

const router = express.Router();


router.post('/edit/personal', protectRoute ,editPersonalInfo);
router.post('/edit/social', protectRoute ,editSocialMedia)





module.exports = router;