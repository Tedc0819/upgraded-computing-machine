let VCR = require(path.resolve(process.cwd(), './lib/VCR.js'))

class TestSuite extends MochaCombo {

  constructor() {

    super()

    this.methodName = 'vcr.run -'

    this.args = ['test']

    this.argTypes = {

      test: [],

    }

  }

  extraCombinations() {

    return [ ];

  };

  before(test, combination) {

  }

  beforeEach(test, combination) {

    return this.runTest(test, combination);

  }

  after(test, combination) {}

  afterEach(test, combination) {

  }

  only(combination) {

    return false;

  }

  skip(combination) {

  }

  stub(test, combination) {


  }

  setFixtures(test, combination) {

  }

  getArgValues(test, combination, arg, argType) {

    var argValues = {

      test: {
        correct: 'test',
      }

    }

    return argValues[arg][argType];

  }

  testMethod(test, combination, argsValues) {

    let id = 'TEST_VCR'

    let delegate = {

      vcrGetArrayOfArgs: function(vcr) {

        return [
          ['hehess', 'hfhf'],
          ['abc', 'def'],
        ]

      },

      vcrCallMethod: function(vcr, args) {

        return args

      }

    }

    let vcr = new VCR({ id, delegate })

    test.vcr = vcr

    return vcr.run()

  }

  clearData(test, combination) {}

  shouldSuccess(combination) {

    return true

  }

  successAssert(combination) {

    it('should return the vcr itself', function() {

      assert.equal(this.res, this.vcr)

    })

    it('should contain 2 items', function() {

      assert.lengthOf(this.res.items, 2)

    })

  }

  failureAssert(combination) {

  }

}

module.exports = TestSuite;

let testSuite = new TestSuite;
testSuite.run()
