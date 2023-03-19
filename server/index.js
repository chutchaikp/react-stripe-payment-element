const express = require('express')
const cors = require('cors')
const Stripe = require('stripe'); // (process.env.STRIPE_SECRET_KEY)
const app = express()
const port = 5000

const dotenv = require('dotenv')
dotenv.config();

// var bodyParser = require('body-parser');
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/create-payment-intent', async (req, res) => {
	// console.info('body', req.body)
	// res.json(req.body);
	// debugger;
	const skey = process.env.STRIPE_SECRET_KEY
	const stripe = new Stripe(skey)

	try {
		const paymentIntent = await stripe.paymentIntents.create({
			currency: 'eur',
			amount: 3099,
			automatic_payment_methods: {
				enabled: true,
			}
		})

		res.send({ clientSecret: paymentIntent.client_secret })
	} catch (error) {
		console.log(error)
	}
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))