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
    buildTree: {},
    currentOperation: [],
    operatorSelected: false,
    operations: [],
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

    calculatePreCompleteOperation() {
      let currentOperation;
      let currentResult;

      const [firstNumber] = this.currentOperation;
      currentOperation = [...this.currentOperation, firstNumber];
      this.operations = this.getOperationStructureToBuildTree(currentOperation);

      ({ currentOperation, currentResult } = this.handleMathResult(
        currentOperation,
        this.result,
      ));

      this.buildTreeByOperations(this.operations);
      this.currentOperation = currentOperation;
      this.result = currentResult;
    },

    getOperationStructureToBuildTree(operations) {
      const traverseOperations = (arr) => (
        arr.reduce((acc, curr) => {
          const token = curr;
          if ([addition, subtract, division, multiply].includes(curr)) {
            let weight;

            switch (curr) {
              case multiply:
                weight = 1;
                break;
              case division:
                weight = 1;
                break;
              case addition:
                weight = 2;
                break;
              case subtract:
                weight = 2;
                break;
            }
            
            acc.push({ token, weight });
          } else {
            acc.push({ token, weight: 3 });
          }
        }, [])
      );

      if (!this.operations.length) {
        return traverseOperations(operations);
      }
      
      const [, operator, secondNumber] = operations;
      return traverseOperations([...this.operations, operator, secondNumber]);
    },

    handleCalculation(param) {
      let paramCloned = cloneDeep(param);
      if (typeof paramCloned === 'object') {
        const { operator } = paramCloned;

        if (operator !== AC) {
          const {
            number1,
            number2,
          } = paramCloned;
          this.currentOperation = [number1, operator, number2];
          this.operations = [...this.currentOperation];
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
            this.calculatePreCompleteOperation();
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

            this.operations = this.getOperationStructureToBuildTree(this.currentOperation);
            this.buildTreeByOperations(this.operations);
            this.currentOperation = currentOperation;
            this.result = currentResult;
          } else if (this.currentOperation.length === 2) {
            this.calculatePreCompleteOperation();
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
