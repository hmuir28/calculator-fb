<template>
  <v-app>
    <v-app-bar
      app
      :class="$style.headerContainer"
    >
      <h1>Universidad Americana</h1>
    </v-app-bar>
    <v-main :class="$style.container">
      <CalculatorMainPanel />
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
import CalculatorMainPanel from './components/Calculator/CalculatorMainPanel';

export default {
  name: 'App',

  components: {
    CalculatorMainPanel,
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
</style>
