export const state = () => ({
  cart: {
    size: 0
  }
});

export const mutations = {
  increment(state, key) {
    state.cart[key].quantity += 1;
    state.cart.size += 1;
  },
  decrement(state, key) {
    if (state.cart[key].quantity > 0) {
      state.cart[key].quantity -= 1;
      state.cart.size -= 1;
    }
  },
  addItem(state, { key, item }) {
    state.cart[key] = item;
    state.cart[key].quantity = 1;
    state.cart.size += 1;
  },
  clearCart(state, key) {
    state.cart = {
      size: 0
    };
  }
};
