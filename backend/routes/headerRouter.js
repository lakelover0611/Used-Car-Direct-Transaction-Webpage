// headerRouter.js
const express = require('express');
const router = express.Router();
const { showName } = require('../controllers/userController');

router.get('/:uNo', showName);


module.exports = router;
