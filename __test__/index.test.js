const chai = require('chai');
const bddStdin = require('bdd-stdin');
const resizer = require('../lib');

const assert = chai.assert;

describe('CLI user interactions', () => {
  it('Select Icon 512 x 512', done => {
    bddStdin(bddStdin.keys.down, '\n');
    resizer.askAndReturnWhichSize().then(data => {
      assert.equal(data.width, 512);
      assert.equal(data.height, 512);
      done();
    });
  });

  it('Select Iphone 6.5"', done => {
    bddStdin(bddStdin.keys.down, bddStdin.keys.down, '\n');
    resizer.askAndReturnWhichSize().then(data => {
      assert.equal(data.width, 1242);
      assert.equal(data.height, 2688);
      done();
    });
  });

  it('Select Iphone 5.5"', done => {
    bddStdin(bddStdin.keys.down, bddStdin.keys.down, bddStdin.keys.down, '\n');
    resizer.askAndReturnWhichSize().then(data => {
      assert.equal(data.width, 1242);
      assert.equal(data.height, 2208);
      done();
    });
  });

  it('Select iPad', done => {
    bddStdin(
      bddStdin.keys.down,
      bddStdin.keys.down,
      bddStdin.keys.down,
      bddStdin.keys.down,
      '\n',
    );
    resizer.askAndReturnWhichSize().then(data => {
      assert.equal(data.width, 2048);
      assert.equal(data.height, 2732);
      done();
    });
  });

  it('Select Android Smartphone', done => {
    bddStdin(
      bddStdin.keys.down,
      bddStdin.keys.down,
      bddStdin.keys.down,
      bddStdin.keys.down,
      bddStdin.keys.down,
      '\n',
    );
    resizer.askAndReturnWhichSize().then(data => {
      assert.equal(data.width, 1487);
      assert.equal(data.height, 2644);
      done();
    });
  });
  it('Select Android Smartphone', done => {
    bddStdin(
      bddStdin.keys.down,
      bddStdin.keys.down,
      bddStdin.keys.down,
      bddStdin.keys.down,
      bddStdin.keys.down,
      bddStdin.keys.down,
      '\n',
    );
    resizer.askAndReturnWhichSize().then(data => {
      assert.equal(data.width, 2048);
      assert.equal(data.height, 2732);
      done();
    });
  });

  describe('Resize Image Preview', () => {
    
  });
});
