// edituserRouter.js
const express = require('express');
const router = express.Router();
const { setUser, editUser } = require('../controllers/userController')

router.get('/:uNo', setUser);
router.post('/editUser', editUser);

module.exports = router;
