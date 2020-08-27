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
import cloneDeep from 'lodash.clonedeep';
import CalculatorInput from './CalculatorInput';
import CalculatorKeys from './CalculatorKeys';
import CalculatorResult from './CalculatorResult';
import CalculatorConsts from '../../util/Constants/CalculatorConstants';

const {
  AC,
  negacion,
  percentage,
  multiply,
  division,
  addition,
  subtract,
  equal,
  point,
} = CalculatorConsts;

export default {
  name: 'CalculatorMainPanel',

  components: {
    CalculatorInput,
    CalculatorKeys,
    CalculatorResult,
  },

  data: () => ({
    buildOperation: '',
    currentOperation: [],
    operatorSelected: false,
    pendingOperation: false,
    result: '',
    tab: 'keys',
  }),

  methods: {
    basicMathOperations(operator) {
      // eslint-disable-next-line
      const { currentOperation, currentResult } = this.handleMathOperation(
        this.currentOperation,
        this.result,
        operator,
      );

      this.currentOperation = currentOperation;
      this.result = currentResult;
    },

    calculateOperation(operationBuilt, operationType) {
      const [num1, num2] = operationBuilt.split(operationType);
      
      const arithmeticOperator = {
        [addition]: (x, y) => x + y,
        [subtract]: (x, y) => x - y,
        [multiply]: (x, y) => x * y,
        [division]: (x, y) => x / y,
        [percentage]: (x) => x / 100, 
      };

      return arithmeticOperator[operationType](+num1, +num2);
    },

    handleCalculation(param) {
      let paramCloned = cloneDeep(param);
      if (typeof paramCloned === 'object') {
        const {
          number1,
          number2,
          operator,
        } = paramCloned;

        if (operator !== AC) {
          this.currentOperation = [number1, operator, number2];
          this.pendingOperation = true;
          paramCloned = equal;
        } else {
          paramCloned = AC;
        }
      }

      let currentOperation;
      let currentResult;
      switch(paramCloned) {
        case AC:
          this.resetValues();
          break;
        case negacion:
          if (this.currentOperation.length <= 1) {
            let num = this.currentOperation.shift();
            num = -num;
            this.currentOperation.unshift(num);
          } else if (this.currentOperation.length === 3) {
            let num = this.currentOperation.pop();
            num = -num;
            this.currentOperation.push(num);
          }

          this.result = String(-this.result);
          break;
        case percentage:
          if (this.currentOperation.length === 2) {
            this.handlePreCompleteOperation();
          }

          // eslint-disable-next-line
          ({ currentOperation, currentResult } = this.handleMathResult(
            this.currentOperation,
            this.result,
            percentage,
          ));

          this.currentOperation = currentOperation;
          this.result = currentResult;
          break;
        case multiply:
          this.basicMathOperations(multiply);
          break;
        case division:
          this.basicMathOperations(division);
          break;
        case subtract:
          this.basicMathOperations(subtract);
          break;
        case addition:
          this.basicMathOperations(addition);
          break;
        case equal:
          if (this.pendingOperation) {
            ({ currentOperation, currentResult } = this.handleMathResult(
              this.currentOperation,
              this.result,
            ));

            this.currentOperation = currentOperation;
            this.result = currentResult;
          } else if (this.currentOperation.length === 2) {
            this.handlePreCompleteOperation();
          }

          this.pendingOperation = this.currentOperation.length === 3;
          break;
        default:
          if (this.operatorSelected) {
            this.result = '';
            this.operatorSelected = false;
          }

          if (param === point && this.result.includes(point)) break;

          this.result += String(param);
          if (this.result.length === 1 && this.result.startsWith(point)) {
            this.result = '0' + this.result;
          }

          if (!this.currentOperation.length) {
            this.currentOperation.push(param);
          } else if (this.currentOperation.length === 1 || this.currentOperation.length === 3) {
            this.currentOperation.pop();
            this.currentOperation.push(+this.result);
          } else if (this.currentOperation.length === 2) {
            this.currentOperation.push(+this.result);
          }

          this.pendingOperation = this.currentOperation.length === 3;
          break;
      }
    },

    handlePreCompleteOperation() {
      let currentOperation;
      let currentResult;

      const [num1] = this.currentOperation;
      currentOperation = [...this.currentOperation, num1];
      ({ currentOperation, currentResult } = this.handleMathResult(
        currentOperation,
        this.result,
      ));

      this.currentOperation = currentOperation;
      this.result = currentResult;
    },
    
    handleMathOperation(currentOperation, currentResult, mathSymbol) {
      if (this.pendingOperation) {
        return this.handleMathResult(
          currentOperation,
          currentResult,
          mathSymbol,
        );
      }

      this.operatorSelected = true;
      if (!currentOperation.length) {
        return {
          currentOperation: ['0', mathSymbol],
          currentResult,
        };
      }

      // eslint-disable-next-line
      const [, operator] = currentOperation;
      if (operator === mathSymbol) return { currentOperation, currentResult };

      if (!currentOperation.includes(mathSymbol)) {
        currentOperation = [...currentOperation, mathSymbol];
      } else {
        this.operatorSelected = false;
        currentOperation = [...currentOperation, currentResult];
      }

      this.pendingOperation = currentOperation.length === 3;

      return {
        currentOperation,
        currentResult,
      };
    },

    handleMathResult(currentOperation, currentResult, mathSymbol = null) {
      const operator = mathSymbol || currentOperation.find(item => {
        return [
          addition,
          subtract,
          division,
          multiply,
          percentage
        ].includes(item);
      });
      const { result } = this.resultOperator(currentOperation, operator);

      currentResult = result;
      currentOperation = [currentResult];
      this.operatorSelected = false;

      return {
        currentOperation,
        currentResult,
      }
    },

    resetValues() {
      this.currentOperation = [];
      this.operatorSelected = false;
      this.pendingOperation = false;
      this.result = '';
    },

    resultOperator(currentOperation, operator) {
      const operationResult = this.calculateOperation(
        currentOperation.join(''),
        operator,
      );

      return {
        result: String(operationResult),
      };
    }
  }
};
</script>

<style>

</style>
