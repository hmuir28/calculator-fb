<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        v-for="(key, index) in keys"
        :key="key"
        :class="$style.key"
        :cols="index < 16 ? columnConsts.twelve : null"
        :sm="index < 16 ? columnConsts.three : null"
      >
        <div>
          <v-btn
            :class="{ [$style.zero]: key === '0' }"
            x-large
            color="primary"
            @click="emitKeys(key)"
          >
            {{ key }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { columnConsts } from '../../util/Constants/SettingsConstants';

export default {
  name: 'CalculatorKeys',

  data: () => ({
    columnConsts,
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

  methods: {
    emitKeys(key) {
      const value = isNaN(key) ? key : +key;
      this.$emit('key-change', value);
    }
  }
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