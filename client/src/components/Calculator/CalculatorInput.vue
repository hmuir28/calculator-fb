<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="number"
          label="Ingrese el número 1"
          :rules="numberRules"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="number"
          label="Ingrese el número 2"
          :rules="numberRules"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CalculatorInput',

  data: () => ({
    number: '',
    numberRules: [
      v => typeof v !== 'number' || 'Digite un valor númerico',
    ],
  }),
}
</script>

<style module>
.inputContainer {

}
</style>