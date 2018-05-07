let Promise = require('bluebird')

class VCR {

  constructor(obj = {}) {

    this.id = obj.id
    this.delegate = obj.delegate || this
    this.items = []
    this.filePath = obj.filePath

  }

  static async writeFile(filePath, data) {

    if (!this._writeFile) {

      this._writeFile = Promise.promisify(require('fs').writeFile)

    }

    return await this._writeFile(filePath, data)

  }

  static async readFile(filePath) {

    if (!this._readFile) {

      this._readFile = Promise.promisify(require('fs').readFile)

    }

    return await this._readFile(filePath)

  }


  async run() {

    let arrayOfArgs = await this.getArrayOfArgs()

    await Promise.each( arrayOfArgs, async (args) => {

      let isError = false

      let res

      try {

        res = await this.callMethod(args)

      }catch(e) {

        isError = true
        res = e

      }

      this.items.push(this.itemForCall(args, res, isError))

    })

    return this

  }

  async storeToFile() {

    if (!this.filePath) {

      throw new Error('VCR need a vcr.filePath to store file')

    }

    let json = JSON.stringify(this.items)

    VCR.writeFile(this.filePath, json)

    return this

  }

  async readFromFile() {

    if (!this.filePath) {

      throw new Error('VCR need a vcr.filePath to read file')

    }

    let data = await VCR.readFile(this.filePath)

    this.items = JSON.parse(data)

    return this

  }


  /* phases */

  async getArrayOfArgs() {

    if (this.delegate && this.delegate.vcrGetArrayOfArgs) {

      return await this.delegate.vcrGetArrayOfArgs(this)

    }

    return []

  }

  async callMethod(args) {

    if (this.delegate && this.delegate.vcrCallMethod) {

      return await this.delegate.vcrCallMethod(this, args)

    }

    return

  }

  itemForCall(args, res, isError) {

    let item

    if (this.delegate && this.delegate.vcrItemForCall) {

       item = this.delegate.vcrItemForCall(this, args, res, isError)

    }

    return item

  }

  /* delegate method */
  vcrItemForCall(vcr, args, res, isError) {

    return {
      args,
      res,
      type: isError ? 'success' : 'failure'

    }
  }

  async vcrGetArrayOfArgs(vcr) {

    return []

  }

  async vcrCallMethod() {

    return null

  }


}

module.exports = VCR
