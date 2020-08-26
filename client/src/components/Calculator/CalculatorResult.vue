<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
      >
        <span
          :class="$style.result"
          :style="fontStylesByResultLen"
        >{{ result || 0 }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CalculatorResult',

  props: {
    result: {
      type: String,
      default: '0', // TODO: check this out, why isn't it working?
    }
  },

  computed: {
    fontStylesByResultLen() {
      let fontSize = '5em';
      if (this.result.length === 10) {
        fontSize = '4em';
      } else if (this.result.length > 10 && this.result.length < 13) {
        fontSize = '3em';
      } else if (this.result.length > 12) {
        fontSize = '2em';
      }

      return {
        fontSize,
      };
    },
  }
}
</script>

<style module>
.result {
  float: right;
  word-break: break-word;
}
</style>