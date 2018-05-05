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

      let item = {
        args,
        type: "success",
        res: null
      }

      try {

        item.res = await this.callMethod(args)

      }catch(e) {

        item.res = e
        item.type = "failure"

      }

      this.items.push(item)

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

  /* delegate method */

  async vcrGetArrayOfArgs(vcr) {

    return []

  }

  async vcrCallMethod() {

    return null

  }


}

module.exports = VCR
