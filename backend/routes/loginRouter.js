// loginRouter.js
const express = require('express');
const router = express.Router();
const { loginUser, findId, findPw, changePw } = require('../controllers/userController');

router.post('/loginUser', loginUser);
router.post('/findId', findId);
router.post('/findPw', findPw);
router.post('/changePw', changePw);

module.exports = router;
