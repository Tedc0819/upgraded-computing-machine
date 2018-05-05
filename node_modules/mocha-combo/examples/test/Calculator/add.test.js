const MochaCombo = require('../../../index.js');
const Calculator = require('../../models/Calculator.js');
const assert = require('chai').assert;

class TestSuite extends MochaCombo {

  constructor() {

    super()
 
    this.methodName = 'Calculator.add'
 
    this.args = ['value']
 
    this.argTypes = {
      value: ['integer', 'integerStr', 'string']
    }

  }

  before(test, combination) {}

  beforeEach(test, combination) {

    return this.runTest(test, combination);
  
  }

  after(test, combination) {}

  afterEach(test, combination) {}

  only(combination) {}

  skip(combination) {}

  stub(test, combination) {}

  setFixtures(test, combination) {}

  getArgValues(test, combination, arg, argType) {

    let argValues = {
      value: {
        'integer': 1, 
        'integerStr': "1111", 
        'string': "fdfafds" 
      }
    }
 
    return argValues[arg][argType];

  }

  testMethod(test, combination, argsValues) {

    let calculator = new Calculator;
    test.calculator = calculator;
    
    return calculator.add(...argsValues);
  }

  clearData(test, combination) {}

  shouldSuccess(combination) {

    let [ value ] = combination;

    return value == 'integer'; 

  }

  successAssert(combination) {
 
    it('should work', function() {
      
      assert.equal(this.res, 1); 
    
    })
  
  }

  failureAssert(combination) {
  
    it('should not work', function() {

      assert(this.res instanceof Error);
    
    })
 
  }
}

let testSuite = new TestSuite;
testSuite.run();
