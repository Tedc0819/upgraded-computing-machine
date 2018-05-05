let VCR = require(path.resolve(process.cwd(), './lib/VCR.js'))

class TestSuite extends MochaCombo {

  constructor() {

    super()

    this.methodName = 'vcr.readFromFile -'

    this.args = ['filePath']

    this.argTypes = {

      filePath: ['correct', 'null'],

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

    test.stubVCRReadFile.restore()

  }

  only(combination) {

    return false;

  }

  skip(combination) {

  }

  stub(test, combination) {


  }

  setFixtures(test, combination) {

    test.filePath = "./TEST_VCR.json"

  }

  getArgValues(test, combination, arg, argType) {

    var argValues = {

      filePath: {
        correct: test.filePath,
        null: null
      }

    }

    return argValues[arg][argType];

  }

  testMethod(test, combination, argsValues) {

    let [filePath] = argsValues

    let id = 'TEST_VCR'

    let vcr = new VCR({ id, filePath })

    test.items = JSON.stringify([
        { args: ['hehe'], type: "success", res: null }
    ])

    test.vcr = vcr

    test.stubVCRReadFile = sinon.stub(VCR, 'readFile').returns(test.items)

    return vcr.readFromFile()

  }

  clearData(test, combination) {}

  shouldSuccess(combination) {

    let [filePath] = combination

    return filePath == 'correct'

  }

  successAssert(combination) {

    it('should return the vcr itself', function() {

      assert.equal(this.res, this.vcr)

    })

    it('should call VCR.writeFile Once with correct Args', function() {

      sinon.assert.calledOnce(this.stubVCRReadFile)

      let data = JSON.stringify(this.vcr.items)

      sinon.assert.calledWith(this.stubVCRReadFile, this.filePath )

    })

  }

  failureAssert(combination) {

    it('should return error', function() {

      assert.equal(this.res.message, 'VCR need a vcr.filePath to read file')

    })

  }

}

module.exports = TestSuite;

let testSuite = new TestSuite;
testSuite.run()
