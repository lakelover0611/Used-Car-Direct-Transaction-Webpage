// joinRouter.js
const express = require('express');
const router = express.Router();
const { saveUser, verifyEmail } = require('../controllers/userController');

router.post('/saveUser', saveUser);
router.post('/verifyEmail', verifyEmail);

module.exports = router;
