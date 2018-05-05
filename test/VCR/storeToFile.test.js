let VCR = require(path.resolve(process.cwd(), './lib/VCR.js'))

class TestSuite extends MochaCombo {

  constructor() {

    super()

    this.methodName = 'vcr.storeToFile -'

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

    test.stubVCRWriteFile.restore()

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

    vcr.items = [
        { args: ['hehe'], type: "success", res: null }
    ]

    test.vcr = vcr

    test.stubVCRWriteFile = sinon.stub(VCR, 'writeFile').returns()

    return vcr.storeToFile()

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

      sinon.assert.calledOnce(this.stubVCRWriteFile)

      let data = JSON.stringify(this.vcr.items)

      sinon.assert.calledWith(this.stubVCRWriteFile, this.filePath, data )

    })

  }

  failureAssert(combination) {

    it('should return error', function() {

      assert.equal(this.res.message, 'VCR need a vcr.filePath to store file')

    })

  }

}

module.exports = TestSuite;

let testSuite = new TestSuite;
testSuite.run()
