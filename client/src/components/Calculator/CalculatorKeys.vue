<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        v-for="(key, index) in keys"
        :key="key"
        :class="$style.key"
        :cols="index < 16 ? '12' : null"
        :sm="index < 16 ? '3' : null"
      >
        <div>
          <v-btn
            :class="{ [$style.zero]: key === '0' }"
            x-large
            color="primary"
          >
            {{ key }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CalculatorKeys',

  data: () => ({
    keys: [
      'AC',
      '±',
      '%',
      '/',
      '7',
      '8',
      '9',
      'x',
      '4',
      '5',
      '6',
      '-',
      '1',
      '2',
      '3',
      '+',
      '0',
      '.',
      '=',
    ]
  }),
}
</script>

<style module scoped>
.key {
  flex: 0;
}

.key button {
  background-color: #565b6e !important;
  border-radius: 0;
}

button.zero {
  min-width: 184px !important;
}
</style>