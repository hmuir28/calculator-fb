<template>
  <v-container :class="$style.mainPanelContainer">
    <v-row>
      <v-col
        class="mx-auto"
        :md="8"
      >
        <v-card
          class="mx-auto"
        >
          <v-alert
            v-if="alertType"
            :type="alertType"
          >
            {{ alertMessageConsts[alertType] }}
          </v-alert>
          <v-card-text :class="$style.cardContainer">
            <div :class="$style.regExpContainer">
              <v-radio-group v-model="regExp">
                <v-radio
                  v-for="option in regExpOptions"
                  :key="option"
                  :label="`${regExpOptionsConsts[option].name}`"
                  :value="regExpOptionsConsts[option].value"
                  @change="() => text = ''"
                />
              </v-radio-group>
            </div>
            <div :class="$style.inputContainer">
              <v-text-field
                v-model="text"
                label="Texto a validar"
              />
              <div class="text-center">
                <v-btn
                  :class="['ma-2', $style.btnValidatorStyle]"
                  outlined
                  @click="validateText()"
                >
                  Validar
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import regExpOptionsConsts from '../../util/Constants/RegExpConstants';
import { alertMessageConsts } from '../../util/Constants/SettingsConstants';

export default {
  name: 'RegExValidatorMainPanel',

  data: () => ({
    alertMessageConsts,
    alertType: '',
    regExp: null,
    regExpOptionsConsts,
    regExpOptions: Object.keys(regExpOptionsConsts),
    text: '',
  }),

  methods: {
    validateText() {
      if (!this.regExp) {
        this.alertType = 'error';
        return;
      }

      const regex = new RegExp(this.regExp);

      if (String(this.text).match(regex)) {
        this.alertType = 'success';
      } else {
        this.alertType = 'error';
      }
    }
  },
}
</script>

<style module>
.btnValidatorStyle {
  background-color: #CD1627 !important;
  color: #ffffff !important;
}

.cardContainer {
  position: relative;
  display: flex;
}

.inputContainer {
  width: 75%;
}

.mainPanelContainer {
  margin-top: 15%;
}

.regExpContainer {
  width: 35%;
}
</style>