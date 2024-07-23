const Stripe = require('stripe');
const { config } = require('dotenv');

config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
    const { products } = req.body;

    const lineItems = products.map(product => ({
        price_data: {
            currency: 'inr', 
            product_data: {
                name: product.name,
                images: [product.image]
            },
            unit_amount: product.price_in_rs*100, 
        },
        quantity: product.quantity,
    }));

    const productDetailsSerialized = JSON.stringify(products.map(product => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price_in_rs * 100, 
    })));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            metadata: { productDetails: productDetailsSerialized },
            mode: 'payment',
            billing_address_collection: 'required',
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Failed to create checkout session: ', error.message);
        res.status(400).json({ message: 'Error creating a checkout session' });
    }
};


const getStats = async (req, res) => {
    try {
        const balance = await stripe.balance.retrieve();

        console.log('Balance Object:', JSON.stringify(balance, null, 2));

        const availableBalanceObj = balance.available.find(b => b.currency === 'usd') || balance.available[0];
        const pendingBalanceObj = balance.pending.find(b => b.currency === 'usd') || balance.pending[0];

        const availableBalance = availableBalanceObj ? availableBalanceObj.amount : 0;
        const pendingBalance = pendingBalanceObj ? pendingBalanceObj.amount : 0;

        const charges = await stripe.charges.list({ limit: 100 });

        const totalCharges = charges.data.length;

        res.json({
            availableBalance,
            pendingBalance,
            totalCharges,
        });
    } catch (error) {
        console.error('Failed to retrieve stats:', error.message);
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    createCheckoutSession,
    getStats
};
