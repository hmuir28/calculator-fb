<template>
  <v-app>
    <v-app-bar
      app
      :class="$style.headerContainer"
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <h1>Universidad Americana</h1>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          :active-class="$style.asideContainer"
        >
          <v-list-item @click.prevent="navigateTo('')">
            <v-list-item-title>Calculadora</v-list-item-title>
          </v-list-item>

          <v-list-item @click.prevent="navigateTo('regex')">
            <v-list-item-title>Validador RegEx</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main :class="$style.container">
      <router-view></router-view>
    </v-main>

    <v-footer
      padless
      :class="[$style.container, $style.footer]"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Author: Harry Muir</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    drawer: false,
  }),

  methods: {
    navigateTo(name) {
      this.$router.push(`/${name}`).catch(() => {});
    }
  },
};
</script>
<style module>
.container {
  background-color: #1a1a1d9e !important;
  display: flex;
}

.footer div:first-of-type {
  color: #ffffff;
}

.headerContainer div:first-of-type {
  background: #CD1627;
}

.headerContainer h1 {
  color: #ffffff;
}

.headerContainer span {
  color: #ffffff;
}

.asideContainer {
  background-color: #ff0000c7;
  color: #ffffff !important;
  caret-color: #ffffff !important;
}
</style>
