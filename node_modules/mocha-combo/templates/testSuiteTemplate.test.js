const MochaCombo from 'mocha-combo';

class TestSuite extends MochaCombo {

  constructor() {

    super()
 
    this.methodName = ''
 
    this.args = []
 
    this.argTypes = {}

  }

  before(test, combination) {}

  beforeEach(test, combination) {}

  after(test, combination) {}

  afterEach(test, combination) {}

  only(combination) {}

  skip(combination) {}

  stub(test, combination) {}

  extraCombinations() {};
 
  setFixtures(test, combination) {}

  getArgValues(test, combination, arg, argType) {}

  testMethod(test, combination, argsValues) {}

  clearData(test, combination) {}

  shouldSuccess(combination) {}

  successAssert(combination) {}

  failureAssert(combination) {}
}

let testSuite = new TestSuite;
testSuite.run();
