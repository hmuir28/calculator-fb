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
          v-for="key in specialKeys"
          :key="key"
          :class="$style.btnKey"
          large
          @click="handleEmitter(key)"
        >
          {{ key }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CalculatorInput',

  data: () => ({
    specialKeys: [
      '=',
      '%',
      '/',
      'x',
      '-',
      '+',
    ],
    number1: '',
    number2: '',
    numberRules: [
      v => !isNaN(v) || 'Digite un valor númerico',
    ],
  }),
  
  methods: {
    handleEmitter(key) {
      if (key === '=') this.$emit('input-change', {
        number1: isNaN(this.number1) ? 0 : +this.number1,
        number2: isNaN(this.number2) ? 0 : +this.number2,
      });
      
      // TODO: Add logic for other operators
    }
  }
}
</script>

<style module>
.btnKey {
  background-color: #565b6e !important;
  border-radius: 0;
}

.btnKey span {
  color: #fff !important;
}
</style>