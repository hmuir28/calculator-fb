<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
      >
        <span :class="$style.result">{{ result }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CalculatorResult',

  data: () => ({
    result: 0,
  }),
}
</script>

<style module>
.result {
  font-size: 5em;
  float: right;
}
</style>