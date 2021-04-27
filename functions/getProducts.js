const axios = require("axios");

exports.handler = async function(event, context) {
  console.log(event.body);
  const config = {
    method: "get",
    url: `https://api.us-central1.gcp.commercetools.com/nuxt-products/product-projections/search?filter=productType.id:"${event.body}"`,
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.COMMERCETOOLS_API_TOKEN
    }
  };

  const res = await axios(config);
  const SHOP_DATA = await res.data.results;

  return {
    statusCode: 200,
    body: JSON.stringify(SHOP_DATA)
  };
};
