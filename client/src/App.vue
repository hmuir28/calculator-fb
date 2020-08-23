<template>
  <v-app>
    <v-main>
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
