<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item brand" v-on:click="redirect('form')">
          <img class="logo" src="../assets/logo.svg" alt="" />
          <span class="brand-name has-text-weight-semibold">Twitter Vibes</span>
        </a>
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="menu"
          v-on:click="showNav = !showNav"
          v-bind:class="{ 'is-active': showNav }"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="menu"
        class="navbar-menu"
        v-bind:class="{ 'is-active': showNav }"
      >
        <div class="navbar-end">
          <a class="navbar-item" v-on:click="redirect('about')">About</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showNav: false,
    };
  },
  name: "NavComponent",
  methods: {
    async redirect(page) {
      if (this.$route.name !== page) {
        await this.$router.push({
          name: page,
        });
      }
    },
  },
};
</script>

<style scoped>
.logo {
  height: 50px;
  margin-right: 10px;
}

.brand {
  margin-right: 50px;
}

.brand-name {
  font-size: 24px;
}

.navbar-item {
  font-size: 24px;
  font-weight: bold;
}
</style>