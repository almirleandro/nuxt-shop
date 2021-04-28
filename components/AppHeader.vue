<template>
  <div id="navbar-wrapper" :class="navbarStickyClass + ' ' + 'sticky'">
    <div class="navbar">
      <div class="logo-div">
        <nuxt-link to="/" class="logo-img">
          <span id="shop-title">Nuxt e-Commerce</span>
          <div class="logo-border"></div>
        </nuxt-link>
      </div>
      <div class="right-side-wrapper">
        <div class="links">
          <nuxt-link to="/">Shop</nuxt-link>
          <nuxt-link to="/blog">Blog</nuxt-link>
        </div>
        <nuxt-link to="/cart">
          <div class="cart-header-div">
            <span>Cart</span>
            <div class="cart-size">
              {{ size }}
            </div>
          </div>
        </nuxt-link>
      </div>
      <button
        class="openbtn"
        @click="openNav"
        v-show="sideNavSize === '0px' ? true : false"
      >
        &#9776;
      </button>
    </div>
    <div class="sidenavbar">
      <div
        id="mySidebar"
        class="sidebar"
        :style="{ width: sideNavSize }"
        @click="closeNav"
      >
        <a href="javascript:void(0)" class="closebtn" @click="closeNav"
          >&times;</a
        >
        <nuxt-link to="/">Shop</nuxt-link>
        <nuxt-link to="/blog">Blog</nuxt-link>
        <nuxt-link to="/cart">
          <div class="cart-header-div">
            <span>Cart</span>
            <div class="cart-size">
              {{ size }}
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="mobile-cart-div">
      <nuxt-link to="/cart">
        <div class="cart-header-div">
          <span>Cart:</span>
          <div class="cart-size">
            {{ size }}
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      quantity: this.$store.state.cart.size,
      sideNavSize: "0px",
      navbarStickyClass: ""
    };
  },
  computed: {
    size() {
      return this.$store.state.cart.size;
    }
  },
  methods: {
    /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
    openNav() {
      this.sideNavSize = "250px";
    },

    /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
    closeNav() {
      this.sideNavSize = "0px";
    }
  }
};
</script>

<style>
.navbar {
  padding: 50px 70px;
  display: flex;
  justify-content: space-between;
}

.navbar a {
  text-decoration: none;
  color: black;
}

.links {
  display: flex;
  align-items: center;
}

.links a {
  display: block;
  margin-left: 40px;
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: 1s;
}

.links a:hover {
  text-decoration-color: black;
}

.logo-div {
  display: flex;
  align-items: center;
}

#shop-title {
  font-size: 1.2rem;
  padding: 10px 20px 5px 0;
}

#shop-title:hover + .logo-border {
  border-bottom: solid 3px black;
  width: 100%;
}

.logo-border {
  padding: 2px 0;
  transition: 1s;
  border-bottom: solid 3px white;
  width: 1px;
}

.cart-header-div {
  display: flex;
  align-items: center;
  margin-left: 35px;
}

.cart-header-div span {
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: 1s;
}

.cart-header-div:hover span {
  text-decoration-color: black;
}

.cart-size {
  border: 1px solid rgb(201, 201, 201);
  border-radius: 3px;
  padding: 0 5px;
  margin-left: 7px;
  text-decoration: none;
}

.right-side-wrapper {
  display: flex;
  align-items: center;
}

/* The sidebar menu */
.sidebar {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0;
  left: 0;
  background-color: rgba(17, 17, 17, 0.932); /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidebar */
}

/* The sidebar links */
.sidebar a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidebar a:hover {
  color: #f1f1f1;
}

/* Position and style the close button (top right corner) */
.sidebar .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

/* The button used to open the sidebar */
.openbtn {
  font-size: 2rem;
  cursor: pointer;
  background-color: white;
  color: black;
  border: none;
  outline: none;
  display: none;
}

.mobile-cart-div {
  display: none;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }
  .sidebar a {
    font-size: 18px;
  }
}

@media screen and (max-width: 590px) {
  .navbar {
    padding: 30px 30px 0 50px;
    min-height: 74.4px;
  }

  .right-side-wrapper {
    display: none;
  }

  .openbtn {
    display: block;
  }

  .cart-header-div {
    margin-left: 0;
  }

  .cart-size {
    margin-left: 12px;
  }

  .mobile-cart-div {
    display: flex;
    margin-left: 55px;
    margin-top: -4px;
  }

  .mobile-cart-div a {
    text-decoration: none;
  }

  .mobile-cart-div .cart-header-div:hover span {
    text-decoration: none;
  }

  .mobile-cart-div .cart-header-div {
    width: fit-content;
    border: 1px solid rgb(201, 201, 201);
    border-radius: 3px;
    padding: 5px 5px 5px 8px;
    text-decoration: none;
  }

  .mobile-cart-div .cart-size {
    border: none;
    margin-left: 8px;
  }

  /* The sticky class is added to the navbar with JS when it reaches its scroll position */
  .sticky {
    background-color: white;
    padding-bottom: 15px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
  }
}
</style>
