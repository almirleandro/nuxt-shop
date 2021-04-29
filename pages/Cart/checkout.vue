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
      <transition name="default">
        <span v-show="displaySentMessage" class="sentMessage"
          >Order submitted. Come back soon!</span
        >
      </transition>
    </form>
  </div>
</template>

<script>
export default {
  name: "CheckoutPage",
  transition: "default",
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
      payment: "PayPal",
      displaySentMessage: false
    };
  },
  computed: {
    total() {
      let number = 0;
      for (let item in this.$store.state.cart) {
        if (this.$store.state.cart[item].quantity) {
          const mul =
            (this.$store.state.cart[item].quantity *
              this.$store.state.cart[item].masterVariant.prices[0].value
                .centAmount) /
            100;
          number += mul;
        }
      }
      return number;
    }
  },
  methods: {
    async handleSubmit() {
      try {
        let customLineItems = [];

        for (let item in this.cart) {
          if (this.cart[item].quantity) {
            const lineObject = {
              quantity: this.cart[item].quantity,
              slug: this.cart[item].name.en.split(" ").join(""),
              name: {
                en: this.cart[item].name.en
              },
              money: {
                currencyCode: "USD",
                centAmount: this.cart[item].masterVariant.prices[0].value
                  .centAmount
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

        const res = await fetch(
          `https://nuxt-ecommerce-template.netlify.app/.netlify/functions/createCart`,
          {
            method: "POST",
            body: JSON.stringify(toSend)
          }
        );
        const data = await res.json();
        this.placeOrder(data);
      } catch (error) {
        console.log("Error trying to create cart");
      }
    },

    async placeOrder(cart) {
      try {
        await fetch(
          `https://nuxt-ecommerce-template.netlify.app/.netlify/functions/placeOrder`,
          {
            method: "POST",
            body: JSON.stringify(cart)
          }
        );

        this.firstName = "";
        this.lastName = "";
        this.phone = "";
        this.email = "";
        this.postcode = "";
        this.city = "";
        this.adress = "";
        this.displaySentMessage = true;
        this.$store.commit("clearCart");
      } catch (error) {
        console.log("Error trying to create order");
      }
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
  margin: 0 62px;
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
  transition: 0.5s; /* Animation */
}

.order-btn:hover {
  background-color: black;
  color: white;
}

.sentMessage {
  margin-top: 20px;
  text-align: right;
  color: rgb(0, 81, 255);
}

.default-enter-active,
.default-leave-active {
  transition: opacity 0.5s;
}
.default-enter,
.default-leave-active {
  opacity: 0;
}

@media screen and (max-width: 680px) {
  .input-block input {
    width: 100%;
  }
}

@media screen and (max-width: 590px) {
  .checkout-container {
    margin-top: 112.6px;
  }
}
</style>
