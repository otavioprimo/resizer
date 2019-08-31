const prompts = require('prompts');
const sharp = require('sharp');
const colors = require('colors');
const path = require('path');
const fs = require('fs');

const { cliOptions } = require('./constant');

const resizedPathDir = 'resized';

module.exports = {
  createCopyDir(content) {
    return new Promise(resolve => {
      if (!fs.existsSync(resizedPathDir)) {
        fs.mkdirSync(resizedPathDir);
      }
      resolve(content);
    });
  },

  askAndReturnWhichSize() {
    return new Promise(async resolve => {
      try {
        const response = await prompts([
          {
            type: 'select',
            name: 'sizeChoice',
            message: colors.green('Escolha qual o tamanho desejado'),
            choices: cliOptions,
          },
        ]);

        resolve(response.sizeChoice);
      } catch (err) {
        process.exit();
      }
    });
  },

  async askAndReturnImages(content) {
    return new Promise(async resolve => {
      const filesToChoice = fs.readdirSync('./')
        .filter(file => {
          const stat = fs.lstatSync(file);
          return stat.isFile();
        })
        .map(file => {
          return { title: file, value: file };
        });

      try {
        const response = await prompts([
          {
            type: 'multiselect',
            name: 'value',
            message: colors.green('Escolha as imagens a serem editadas'),
            choices: filesToChoice,
          },
        ]);

        content.files = response.value;

        resolve(content);
      } catch (err) {
        process.exit();
      }
    });
  },

  async resizeAndRemoveAlphaChannel(content) {
    if (!content.files)
      process.exit();

    const { files, width, height } = content;
    for (const file of files) {
      sharp(file)
        .resize(width, height, {
          fit: 'contain'
        })
        .removeAlpha()
        .toBuffer()
        .then(data => fs.writeFileSync(path.resolve(resizedPathDir, file), data))
        .catch(err => console.log(err))
    }
  },
};
