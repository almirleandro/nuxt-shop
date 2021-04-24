<template>
  <div class="checkout-container">
    <form class="billing" @submit.prevent="handleSubmit">
      <span class="checkout-title">Billing Details</span>
      <div class="input-block">
        <input
          type="text"
          placeholder="First Name"
          required
          v-model="firstName"
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          v-model="lastName"
        />
      </div>
      <div class="input-block">
        <input type="number" placeholder="Phone" required v-model="phone" />
        <input type="email" placeholder="Email" required v-model="email" />
      </div>
      <div class="input-block">
        <input
          type="text"
          placeholder="Postcode/ZIP"
          required
          v-model="postcode"
        />
        <input type="text" placeholder="City" required v-model="city" />
      </div>
      <input type="text" placeholder="Adress" required v-model="adress" />
      <select
        name="paymentMethod"
        id="paymentMethod"
        required
        v-model="payment"
      >
        <option value="PayPal" selected>Payment Method: PayPal</option>
        <option value="CreditCard">Payment Method: Credit Card</option>
      </select>
      <span class="total-checkout">Total: ${{ total }}</span>
      <button class="order-btn">Place Order</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CheckoutPage",
  data() {
    return {
      cart: this.$store.state.cart,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      postcode: "",
      city: "",
      adress: "",
      payment: "PayPal"
    };
  },
  computed: {
    total() {
      let number = 0;
      for (let item in this.$store.state.cart) {
        if (this.$store.state.cart[item].quantity) {
          const mul =
            this.$store.state.cart[item].quantity *
            this.$store.state.cart[item].price;
          number += mul;
        }
      }
      return number;
    }
  },
  methods: {
    handleSubmit() {
      let customLineItems = [];

      for (let item in this.cart) {
        if (this.cart[item].quantity) {
          const lineObject = {
            quantity: this.cart[item].quantity,
            slug: this.cart[item].name.split(" ").join(""),
            name: {
              en: this.cart[item].name
            },
            money: {
              currencyCode: "USD",
              centAmount: this.cart[item].price * 100
            },
            taxCategory: {
              id: "a91a4501-ff7c-4eb9-a1f4-4da70c7c7b0a"
            }
          };

          customLineItems.push(lineObject);
        }
      }

      const toSend = {
        currency: "USD",
        customLineItems,
        customerEmail: this.email,
        shippingAddress: {
          country: "BR",
          firstName: this.firstName,
          lastName: this.lastName,
          city: this.city,
          postalCode: this.postcode,
          phone: this.phone,
          email: this.email
        }
      };

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer 8AkBBBgLvhm5p_c9B9SJOo6n8oWPo0hE"
      );

      var raw = JSON.stringify(toSend);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch(
        "https://api.us-central1.gcp.commercetools.com/nuxt-products/carts",
        requestOptions
      )
        .then(response => response.json())
        .then(result => this.placeOrder(result))
        .catch(error => console.log("error", error));
    },
    placeOrder(cart) {
      console.log(cart);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer 8AkBBBgLvhm5p_c9B9SJOo6n8oWPo0hE"
      );

      var raw = JSON.stringify({
        version: 1,
        cart: {
          id: cart.id
        },
        paymentState: "Pending",
        shipmentState: "Pending"
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch(
        "https://api.us-central1.gcp.commercetools.com/nuxt-products/orders",
        requestOptions
      )
        .then(json => json.json())
        .then(response => console.log(response))
        .catch(error => console.log("error", error));
    }
  }
};
</script>

<style>
.checkout-container {
  min-height: 90vh;
  display: flex;
  justify-content: center;
  padding-top: 50px;
}

.billing {
  width: 550px;
  display: flex;
  flex-direction: column;
}

.billing input,
.billing select {
  padding: 12px;
  margin-bottom: 15px;
  font-size: 1rem;
  border: 1px solid rgb(194, 194, 194);
  border-radius: 5px;
}

.input-block input {
  width: 49%;
}

.checkout-title {
  font-size: 1.5rem;
  margin-bottom: 30px;
}

.total-checkout {
  font-size: 1.5rem;
  display: block;
  margin: 30px 0 30px;
  text-align: right;
}

.order-btn {
  font-size: 1.05rem;
  padding: 15px;
  background-color: white;
  outline: none;
  border: 1px solid black;
  cursor: pointer;
  align-self: flex-end;
  width: fit-content;
  height: fit-content;
}

.order-btn:hover {
  background-color: black;
  color: white;
}
</style>
