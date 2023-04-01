import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import './payment.scss';

const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  // set public
  useEffect(() => {
    try {
      const publicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
      console.log(publicKey);
      setStripePromise(loadStripe(publicKey));
    } catch (error) {
      debugger;
    }
  }, []);

  // set secret
  useEffect(() => {
    async function stripeIntents() {
      try {
        debugger;
        const { data } = await axios.post(
          'http://localhost:5000/create-payment-intent',
          {
            // details here
          }
        );

        debugger;
        const _clientSecret = data.clientSecret;
        setClientSecret(_clientSecret);
      } catch (error) {
        debugger;
      }
    }

    stripeIntents();
  }, []);

  return (
    <div className="payment">
      <h1>React Stripe and the Payent Element</h1>

      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
export default Payment;
