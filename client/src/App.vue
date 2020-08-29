<template>
  <v-app>
    <v-app-bar
      app
      :class="$style.headerContainer"
    >
      <h1>Universidad Americana</h1>
    </v-app-bar>
    <v-main :class="$style.mainContainer">
      <CalculatorMainPanel />
    </v-main>
  </v-app>
</template>

<script>
import CalculatorMainPanel from './components/Calculator/CalculatorMainPanel';

export default {
  name: 'App',

  components: {
    CalculatorMainPanel,
  },

  data: () => ({
    //
  }),
};
</script>
<style module>
.headerContainer div:first-of-type {
  background: #CD1627;
}

.headerContainer h1 {
  color: #ffffff;
}

.mainContainer {
  background-color: #1a1a1d9e;
  display: flex;
}
</style>
