/*
   Description: Payment component integrating Stripe for handling payments.
   Author: Sujan Baskota
   Date created: June 26, 2024
   Date modified: June 26, 2024
   <Start of modification section>
       2024-06-26 => Initial creation of Payment component with Stripe integration.
   <End of modification section>
*/

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useGlobalContext } from "../components/Context";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/config/").then(async (r) => {
      console.log(r);
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/create-payment-intent/", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <div className="w-[50vw] mt-10 mx-auto">
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
