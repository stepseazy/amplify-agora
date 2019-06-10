import React from "react";

import { API } from "aws-amplify";

import StripeCheckout from "react-stripe-checkout";

// import { Notification, Message } from "element-react";

const stripeConfig = {
  currency: "USD",
  publishableAPIKey: "pk_test_u5EoEcFPSmGReZvAjxmf9Zb8"
};

const PayButton = ({ product, user }) => {
  const handleCharge = async token => {
    try {
      const result = await API.post("api4c0d9f8e", "/charge", {
        //amplifyagorab7b84710
        body: {
          token,
          charge: {
            currency: stripeConfig.currency,
            amount: product.price,
            description: product.description
          }
        }
      });
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StripeCheckout
      token={handleCharge}
      email={user.attributes.email}
      name={product.description}
      amount={product.price}
      currency={stripeConfig.currency}
      stripeKey={stripeConfig.publishableAPIKey}
      shippingAddress={product.shipped}
      billingAddress={product.shipped}
      locale="auto"
      allowRememberMe={true}
    />
  );
};

export default PayButton;
