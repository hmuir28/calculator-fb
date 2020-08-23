<template>
  <v-card
    class="mx-auto"
    max-width="calc(28.5% - 49px)"
  >
    <v-card-text>
      <CalculatorResult
        :result="result"
      />

      <v-tabs v-model="tab">
        <v-tab key="keys">Teclas</v-tab>
        <v-tab key="inputs">Ingresar</v-tab>
      </v-tabs>
      
      <v-tabs-items v-model="tab">
        <v-tab-item key="keys">
          <CalculatorKeys
            @key-change="handleCalculation"
          />
        </v-tab-item>

        <v-tab-item key="inputs">
          <CalculatorInput
            @input-change="handleCalculation"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import CalculatorInput from './CalculatorInput';
import CalculatorKeys from './CalculatorKeys';
import CalculatorResult from './CalculatorResult';

export default {
  name: 'CalculatorMainPanel',

  components: {
    CalculatorInput,
    CalculatorKeys,
    CalculatorResult,
  },

  data: () => ({
    tab: 'keys',
    result: 0,
  }),

  methods: {
    handleCalculation(param) {
      if (typeof param === 'object') {
        console.log(param);
      } else {
        console.log(param);
      }
    },
  }
};
</script>

<style>

</style>
