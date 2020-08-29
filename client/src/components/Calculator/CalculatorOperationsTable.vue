<template>
  <v-data-table
    v-if="items.length"
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
  />
</template>

<script>
export default {
  name: 'CalculatorOperationsTable',

  props: {
    items: {
      type: Array,
      default: () => ([]),
    },
  },

  data: () => ({
    headers: [
      { text: 'Número 1', value: 'num1' },
      { text: 'Operador', value: 'operator' },
      { text: 'Número 2', value: 'num2' },
    ],
  }),

  watch: {
    items() {

    }
  }
}
</script>

<style>

</style>
