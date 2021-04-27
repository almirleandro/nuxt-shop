const axios = require("axios");

exports.handler = async function(event, context) {
  const config = {
    method: "get",
    url:
      "https://api.us-central1.gcp.commercetools.com/nuxt-products/product-types",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.COMMERCETOOLS_API_TOKEN
    }
  };

  const res = await axios(config);
  const sections = await res.data.results;

  return {
    statusCode: 200,
    body: JSON.stringify(sections)
  };
};
