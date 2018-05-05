class TestSuite extends MochaCombo {

  constructor() {
  
    super();
  
    this.methodName = "PromiseCalculator.giveSuggestion"

    this.args = []

    this.argTypes = {
      
    }

  }

  stub(test, combination) {

    return new Promise(function(resolve, reject) {

      resolve("I am stubbing nothing"); 
      
    })

  }

  setFixtures(test, combination) {

    return new Promise(function(resolve, reject) {

      resolve("I am setting nothing"); 
      
    })
 
  }

  getArgValues(test, combination, arg, argType) {
 
    let values = {

    }
  
    return values[arg][argType];
  }

  testMethod(test, combination, argValues) {

    return new Promise(function(resolve, reject) {

      resolve("I am testing nothing"); 
      
    })
 
  }

  beforeEach(test, combination) {

    return this.runTest(test, combination);    

  }

}

let testSuite = new TestSuite;
testSuite.run();
