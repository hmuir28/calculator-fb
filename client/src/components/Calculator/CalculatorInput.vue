<template>
  <v-container :class="$style.inputContainer">
    <v-row>
      <v-col
        cols="12"
        sm="12"
      >
        <v-text-field
          v-model="number1"
          label="Ingrese el número 1"
          :rules="numberRules"
        />
      </v-col>

      <v-col
        cols="12"
        sm="12"
      >
        <v-text-field
          v-model="number2"
          label="Ingrese el número 2"
          :rules="numberRules"
        />
      </v-col>

      <v-col
        cols="12"
        sm="8"
      >
        <v-btn
          v-for="operator in mathOperators"
          :key="operator"
          :class="$style.btnOperator"
          large
          @click="handleEmitter(operator)"
        >
          {{ operator }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CalculatorConsts from '../../util/Constants/CalculatorConstants';
const {
  AC,
  percentage,
  multiply,
  division,
  addition,
  subtract,
} = CalculatorConsts;

export default {
  name: 'CalculatorInput',

  data: () => ({
    mathOperators: [
      AC,
      percentage,
      division,
      multiply,
      subtract,
      addition,
    ],
    number1: '',
    number2: '',
    numberRules: [
      v => !isNaN(v) || 'Digite un valor númerico',
    ],
  }),
  
  methods: {
    handleEmitter(operator) {
      if (((operator === '%' && (this.number1)) || (this.number1 && this.number2)) || operator === AC) {
        this.$emit('input-change', {
          number1: isNaN(this.number1) ? 0 : +this.number1,
          number2: isNaN(this.number2) ? 0 : +this.number2,
          operator,
        });
      }
    }
  }
}
</script>

<style module>
.btnOperator {
  background-color: #565b6e !important;
  border-radius: 0 !important;
}

.btnOperator span {
  color: #fff !important;
}
</style>