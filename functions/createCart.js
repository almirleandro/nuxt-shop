const axios = require("axios");

exports.handler = async function(event, context) {
  const raw = JSON.parse(event.body);

  const config = {
    method: "post",
    url: `https://api.us-central1.gcp.commercetools.com/nuxt-products/carts`,
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
