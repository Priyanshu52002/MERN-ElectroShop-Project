// stripeRoutes.js
const express = require('express');
const { createCheckoutSession, getStats } = require('../controllers/stripeController');
const { protectUser, isAuthorised } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a checkout session

router.route('/api/stats').get(getStats);

router.use(protectUser);
router.route('/create-checkout-session').post(createCheckoutSession);


// Route to get Stripe account stats


module.exports = router;
