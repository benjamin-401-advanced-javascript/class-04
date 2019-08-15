const Categories = require('../categories/categories.js');

describe('Categories Model', () => {

  let categories;

  beforeEach(() => {
    categories = new Categories();
  })

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = categories.schema;
    var testRecord = {};
    const testValues = {
      string: 'Test String',
      number: 69,
      boolean: true,
    }

    // if this field in schema is required create it with null value
    for (var field in schema) {
      testRecord[field] = testValues[schema[field].type];
    }

    expect(categories.sanitize(testRecord)).toBeDefined();
  });

  it('can post() a new category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can update() a category', () => {
    const obj1 = { name: 'Test Name1' };
    const obj2 = { name: 'Test Name2' };

    // create a category
    // then update it
    // then check for updated value
    categories.create(obj1)
      .then((record) => {
        expect(record.name).toEqual(obj1.name);
        return categories.update(record.id, obj2)
      })
      .then((record) => {
        expect(record.name).toEqual(obj2.name);
      })
  });

  it('can delete() a category', () => {
    const obj1 = { name: 'Test Category1' };
    const obj2 = { name: 'Test Category2' };
    const obj3 = { name: 'Test Category3' };

    // create 3 categories
    // then delete one
    // then check there's only 2 left
    categories.create(obj1)
      .then(() => {
        return categories.create(obj2);
      })
      .then(() => {
        return categories.create(obj3);
      })
      .then(() => {
        return categories.delete(categories.database[1].id)
      })
      .then(() => {
        expect(categories.database.length).toEqual(2);
      });

  });

  it('can get() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

});