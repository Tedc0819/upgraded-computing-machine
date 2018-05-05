class Calculator {

  constructor() {
 
    this._currentValue = 0;
  
  }

  get currentValue() {
    return this._currentValue; 
  }

  set currentValue(value) {
    this._currentValue = value; 
  }

  add(value) {

    if (typeof value == 'string') {
      throw new Error('input should be integer'); 
    }
 
    this._currentValue += value;
    return this._currentValue;
  
  }

  subtract(value) {
 
    this._currentValue -= value;
    return this._currentValue;
  
  }

  multiply(value) {
 
    this._currentValue = this._currentValue * value;
    return this._currentValue;
  
  }

  divide(value) {
 
    this._currentValue = this._currentValue / value;
    return this._currentValue;
  
  }

  canCalculate(type) {

    let types = ['add', 'subtract', 'multiply', 'divide'] 
    return types.includes(type);

  }

  giveSuggestion() {

    return 'This is my suggestion';
  
  }
}

module.exports = Calculator;
