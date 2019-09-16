const chai = require('chai');
const bddStdin = require('bdd-stdin');
const fs = require('fs');

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

  describe('Create Directory', () => {
    it('Should create "resized directory"', done => {
      resizer.createCopyDir({}).then(() => {
        if (fs.existsSync('./resized')) done();
      });
    });
  });

  describe('Resize Image Preview', () => {
    it('Should resize Icon to 512x512', done => {
      const content = {
        width: 512,
        height: 512,
        files: ['test-1.jpg'],
      };

      resizer.resizeAndRemoveAlphaChannel(content).then(() => {
        setTimeout(() => {
          if (fs.existsSync('./resized/test-1.jpg')) {
            fs.unlinkSync('./resized/test-1.jpg');
            done();
          }
        }, 300);
      });
    });

    it('Should resize image to 600x900', done => {
      const content = {
        width: 600,
        height: 900,
        files: ['test-2.jpg'],
      };

      resizer.resizeAndRemoveAlphaChannel(content).then(() => {
        setTimeout(() => {
          if (fs.existsSync('./resized/test-2.jpg')) {
            fs.unlinkSync('./resized/test-2.jpg');
            done();
          }
        }, 300);
      });
    });
  });
});
