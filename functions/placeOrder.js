const axios = require("axios");

exports.handler = async function(event, context) {
  const body = JSON.parse(event.body);
  const raw = JSON.stringify({
    version: 1,
    cart: {
      id: body.id
    },
    paymentState: "Pending",
    shipmentState: "Pending"
  });

  const config = {
    method: "post",
    url: `https://api.us-central1.gcp.commercetools.com/nuxt-products/orders`,
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.COMMERCETOOLS_API_TOKEN
    },
    data: raw
  };

  const res = await axios(config);
  const data = res.data;

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
