const chai = require('chai');
const bddStdin = require('bdd-stdin')
const resizer = require('../lib');

const assert = chai.assert;

describe('CLI user interactions', () => {
  it('Select Icon Size', (done) => {
    bddStdin(bddStdin.keys.down, '\n');
    resizer.askAndReturnWhichSize()
      .then(data => {
        assert.equal(data.width, 512);
        assert.equal(data.height, 512);
        done();
      })
  });
});