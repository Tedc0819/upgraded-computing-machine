let Promise = require('bluebird')

class VCR {

  constructor(obj = {}) {

    this.id = obj.id
    this.delegate = obj.delegate || this
    this.items = []
    this.filePath = obj.filePath

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

  static async writeFile(filePath, data) {

    let writeFile = Promise.promisify(require('fs').writeFile)

    return await writeFile(filePath, data)

  }

  async storeToFile() {

    if (!this.filePath) {

      throw new Error('VCR need a vcr.filePath to store file')

    }

    let json = JSON.stringify(this.items)

    VCR.writeFile(this.filePath, json)

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
