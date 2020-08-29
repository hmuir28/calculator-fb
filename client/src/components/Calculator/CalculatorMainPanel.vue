<template>
    <v-container>
    <v-row>
      <v-col :md="6">
        <v-card
          :class="['mx-auto', $style.calculatorCard]"
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
      </v-col>
      <v-col :md="6">
        <CalculatorOperationsTable :items="operations" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import cloneDeep from 'lodash.clonedeep';
import CalculatorInput from './CalculatorInput';
import CalculatorKeys from './CalculatorKeys';
import CalculatorResult from './CalculatorResult';
import CalculatorConsts from '../../util/Constants/CalculatorConstants';
import CalculatorOperationsTable from './CalculatorOperationsTable';
import { mapActions, mapState } from 'vuex';

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
    CalculatorOperationsTable,
  },

  data: () => ({
    buildTree: {},
    currentOperation: [],
    operatorSelected: false,
    pendingOperation: false,
    result: '',
    tab: 'keys',
  }),

  computed: mapState('operations', {
    operations: state => state.operations,
  }),

  async mounted() {
    await this.fetchOperations();
  },

  methods: {
    ...mapActions('operations', [
      'fetchOperations',
      'updateOperations',
    ]),

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

    calculateOperation(operationBuilt, { operator: operationType }) {
      const [{ num: num1 }, { num: num2 }] = operationBuilt.filter((op) => !op.operator);
      
      const arithmeticOperator = {
        [addition]: (x, y) => x + y,
        [subtract]: (x, y) => x - y,
        [multiply]: (x, y) => x * y,
        [division]: (x, y) => x / y,
        [percentage]: (x) => x / 100, 
      };

      return arithmeticOperator[operationType](+num1, +num2);
    },

    async calculateInCompleteOperation() {
      let currentOperation;
      let currentResult;

      const [{ num }] = this.currentOperation;
      currentOperation = [...this.currentOperation, { num }];
      const operationStructure = this.getOperationStructureTransformed(currentOperation);
      await this.updateOperations(operationStructure);

      ({ currentOperation, currentResult } = this.handleMathResult(
        currentOperation,
        this.result,
      ));

      this.currentOperation = currentOperation;
      this.result = currentResult;
    },

    getOperationStructureTransformed(operations) {
      const transformOperationsStructure = () => {
        let incrementNumId = 1;
        let iterate = 0;
        const operationsArray = [];
        const operationObj = {};

        operations.forEach((operation) => {
          if (operation.num) {
            operationObj[`num${incrementNumId}`] = operation.num;
            incrementNumId += 1;
          } else {
            operationObj.operator = operation.operator;
          }

          iterate += 1;
          if (iterate === 3) {
            incrementNumId = 1;
            iterate = 0;
            operationsArray.push(operationObj);
          }
        });

        return operationsArray;
      };

      if (!this.operations.length) {
        return transformOperationsStructure(operations);
      }
      
      const [firstNumber, operator, secondNumber] = operations;
      return transformOperationsStructure([
        ...this.operations,
        firstNumber,
        operator,
        secondNumber,
      ]);
    },

    async handleCalculation(param) {
      let paramCloned = cloneDeep(param);
      if (typeof paramCloned === 'object') {
        const { operator } = paramCloned;

        if (operator !== AC) {
          const {
            number1,
            number2,
          } = paramCloned;

          this.currentOperation = [{
            num: number1
          }, {
            operator
          }, {
            num: number2 
          }];

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
            let { num } = this.currentOperation.shift();
            num = -num;
            this.currentOperation.unshift(num);
          } else if (this.currentOperation.length === 3) {
            let { num } = this.currentOperation.pop();
            num = -num;
            this.currentOperation.push({ num: num });
          }

          this.result = String(-this.result);
          break;
        case percentage:
          if (this.currentOperation.length === 2) {
            await this.calculateInCompleteOperation();
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

            const operationStructure = this.getOperationStructureTransformed(this.currentOperation);
            await this.updateOperations(operationStructure);

            this.currentOperation = currentOperation;
            this.result = currentResult;
          } else if (this.currentOperation.length === 2) {
            await this.calculateInCompleteOperation();
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
            this.result = 0 + this.result;
          }

          if (!this.currentOperation.length) {
            this.currentOperation.push({ num: param });
          } else if (this.currentOperation.length === 1 || this.currentOperation.length === 3) {
            this.currentOperation.pop();
            this.currentOperation.push({ num: +this.result });
          } else if (this.currentOperation.length === 2) {
            this.currentOperation.push({ num: +this.result });
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
          currentOperation: [{ num: 0 }, { operator: mathSymbol }],
          currentResult,
        };
      }

      // eslint-disable-next-line
      const [, operator] = currentOperation;
      if (operator === mathSymbol) return { currentOperation, currentResult };

      if (!currentOperation.includes(mathSymbol)) {
        currentOperation = [...currentOperation, { operator: mathSymbol }];
      } else {
        this.operatorSelected = false;
        currentOperation = [...currentOperation, { num: currentResult }];
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
        ].includes(item.operator);
      });
      const { result } = this.getResultOperation(currentOperation, operator);

      currentResult = result;
      currentOperation = [{ num: currentResult }];
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

    getResultOperation(currentOperation, operator) {
      const operationResult = this.calculateOperation(
        currentOperation,
        operator,
      );

      return {
        result: String(operationResult),
      };
    }
  }
};
</script>
<style module>
.calculatorCard {
  width: 75%;
}
</style>
