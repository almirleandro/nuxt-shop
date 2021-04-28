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
            <img :src="item.masterVariant.images[0].url" :key="item.name.en" />
          </div>
          <span class="item-label description-label">Description: </span>
          <span class="item-name">{{ item.name.en }}</span>
          <div class="blank-div"></div>
          <span class="item-label quantity-label">Quantity: </span>
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
          <div class="blank-div"></div>
          <span class="item-label price-label">Price: </span>
          <span class="item-price"
            >${{
              rightPrice(
                item.masterVariant.prices[0].value.centAmount / 100,
                item.quantity
              )
            }}</span
          >
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
  transition: "default",
  data() {
    return {
      cart: this.$store.state.cart
    };
  },
  methods: {
    increaseQuantity(item) {
      const key = item.name.en.split(" ").join("");
      this.$store.commit("increment", key);
    },
    decreaseQuantity(item) {
      const key = item.name.en.split(" ").join("");
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
          const mul =
            (this.cart[item].quantity *
              this.cart[item].masterVariant.prices[0].value.centAmount) /
            100;
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
  margin: 0 40px 100px;
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

.item-label {
  display: none;
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
  transition: 0.5s; /* Animation */
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

.blank-div {
  display: none;
}

.default-enter-active,
.default-leave-active {
  transition: opacity 0.5s;
}
.default-enter,
.default-leave-active {
  opacity: 0;
}

@media screen and (max-width: 820px) {
  .item-content {
    width: 100%;
    display: grid;
    grid-template-columns: 0.8fr 1fr;
    grid-template-rows: repeat(6, 1fr);
    padding: 10px 0;
    border-bottom: 3px rgb(231, 231, 231) solid;
  }

  .item-img {
    min-width: 100%;
    max-height: 100%;
    padding-right: 30px;
    grid-column: 1 / 2;
    grid-row: 1 / 7;
  }

  .item-label {
    display: block;
    margin-top: 15px;
    padding-left: 10px;
    text-align: center;
  }

  .top-row {
    display: none;
  }

  .content-rows {
    border-top: 3px rgb(231, 231, 231) solid;
  }

  .item-name,
  .quantity-div,
  .item-price {
    margin-bottom: 15px;
    padding-left: 10px;
    text-align: center;
  }
}

@media screen and (max-width: 590px) {
  .cart-container {
    margin-top: 112.6px;
    display: flex;
    justify-content: center;
    min-height: 90vh;
  }
}

@media screen and (max-width: 510px) {
  .item-content {
    grid-template-columns: 0.8fr 1fr;
    grid-template-rows: repeat(4, 1fr) repeat(2, 0.5fr);
  }

  .description-label {
    grid-column: 1 / 2;
    grid-row: 5 / 6;
    text-align: left;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .item-name {
    grid-column: 1 / 2;
    grid-row: 6 / 7;
    text-align: left;
    padding-bottom: 5px;
  }

  .item-img {
    grid-column: 1 / 2;
    grid-row: 1 / 5;
    padding: 0;
  }

  .item-name,
  .item-label {
    margin: 0px;
  }

  .blank-div {
    display: block;
  }

  .quantity-label,
  .price-label {
    margin-top: 15px;
  }
}
</style>
