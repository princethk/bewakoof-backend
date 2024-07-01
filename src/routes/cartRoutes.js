const express = require('express');
const { addToCart, getCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/add', protect, addToCart);
router.get('/', protect, getCart);

module.exports =router;
