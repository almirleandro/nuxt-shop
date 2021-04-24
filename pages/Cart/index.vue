<template>
  <div class="cart-container">
    <div class="cart-table">
      <div class="top-row">
        <span>Product</span>
        <span>Description</span>
        <span>Quantity</span>
        <span>Price</span>
      </div>
      <div class="content-rows">
        <div class="item-content" v-for="item in cart" v-if="item.quantity">
          <div class="item-img">
            <img :src="item.imageUrl" :key="item.name" />
          </div>
          <span>{{ item.name }}</span>
          <div class="quantity-div">
            <button
              class="quantity-btn"
              @click.prevent="decreaseQuantity(item)"
            >
              <
            </button>
            <span>{{ item.quantity }}</span>
            <button
              class="quantity-btn"
              @click.prevent="increaseQuantity(item)"
            >
              >
            </button>
          </div>
          <span>${{ rightPrice(item.price, item.quantity) }}</span>
        </div>
      </div>
      <span class="total-price">Total: ${{ total }}</span>
      <nuxt-link to="/cart/checkout">
        <button class="checkout-btn">
          Go to Checkout
        </button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartPage",
  data() {
    return {
      cart: this.$store.state.cart
    };
  },
  methods: {
    increaseQuantity(item) {
      const key = item.name.split(" ").join("");
      this.$store.commit("increment", key);
    },
    decreaseQuantity(item) {
      const key = item.name.split(" ").join("");
      this.$store.commit("decrement", key);
    },
    rightPrice(originalPrice, quantity) {
      return originalPrice * quantity;
    }
  },
  computed: {
    total() {
      let number = 0;
      for (let item in this.cart) {
        if (this.cart[item].quantity) {
          const mul = this.cart[item].quantity * this.cart[item].price;
          number += mul;
        }
      }
      return number;
    }
  }
};
</script>

<style>
.cart-container {
  padding-top: 50px;
  display: flex;
  justify-content: center;
  min-height: 90vh;
}

.cart-table {
  width: 680px;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
}

.top-row {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr) 0.5fr;
  padding: 0 0 20px;
  border-bottom: 3px rgb(231, 231, 231) solid;
  font-size: 0.9rem;
}

.item-content {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr) 0.5fr;
  grid-template-rows: 1fr;
  padding: 10px 0;
  border-bottom: 3px rgb(231, 231, 231) solid;
}

.item-img {
  min-width: 100%;
  max-height: 180px;
  padding-right: 30px;
}

.item-img img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.item-content span,
.quantity-div {
  align-self: center;
}

.quantity-btn {
  border: none;
  outline: none;
  background-color: white;
  font-weight: 700;
  cursor: pointer;
}

.total-price {
  font-size: 1.5rem;
  display: block;
  margin: 30px 0 70px;
  text-align: right;
}

.checkout-btn {
  font-size: 1.05rem;
  padding: 15px;
  background-color: white;
  outline: none;
  border: 1px solid black;
  cursor: pointer;
}

.checkout-btn:hover {
  background-color: black;
  color: white;
}

.cart-table a {
  align-self: flex-end;
  width: fit-content;
  height: fit-content;
}
</style>
