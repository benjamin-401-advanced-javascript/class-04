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

    for (var field in schema) {
      // if this field is required create it with null value
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(categories.sanitize(testRecord)).toBeUndefined();
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

  it('can delete() a category', () => {
    //create 3 categories
    let obj1 = { name: 'Test Category1' };
    let obj2 = { name: 'Test Category2' };
    let obj3 = { name: 'Test Category3' };
    categories.create(obj1);
    categories.create(obj2);
    categories.create(obj3);

    // delete 1 categorey
    return categories.delete(categories.database[1].id)
      .then(() => {
        expect(categories.database.length).toEqual(2);
      })

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