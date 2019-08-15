'use strict';

const DataModel = require('../memory.js');

class Categories extends DataModel {
  constructor() {
    super();
    this.schema = {
      id: { required: true, type: 'string' },
      name: { required: true, type: 'string' },
    };
  }
}

module.exports = Categories;