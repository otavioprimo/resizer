const prompts = require('prompts');
const sharp = require('sharp');
const colors = require('colors');
const path = require('path');
const fs = require('fs');

const {cliOptions, supportedImagesExtensions} = require('./constant');

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
    return new Promise(async (resolve, reject) => {
      try {
        const response = await prompts([
          {
            type: 'select',
            name: 'sizeChoice',
            message: colors.green('Escolha qual o tamanho desejado'),
            choices: cliOptions,
          },
        ]);

        sizes = {
          width: Number(response.sizeChoice.width),
          height: Number(response.sizeChoice.height),
        };

        resolve(sizes);
      } catch (error) {
        reject(error);
      }
    });
  },

  askCustomWidthAndHeight(content) {
    return new Promise(async resolve => {
      if (content.width > 0 && content.height > 0) return resolve(content);

      const responseCustomWidth = await prompts([
        {
          type: 'number',
          name: 'width',
          message: colors.yellow('Digite a largura desejada'),
        },
      ]);

      const responseCustomHeight = await prompts([
        {
          type: 'number',
          name: 'height',
          message: colors.yellow('Digite a altura desejada'),
        },
      ]);

      sizes = {
        width: Number(responseCustomWidth.width),
        height: Number(responseCustomHeight.height),
      };

      resolve(sizes);
    });
  },

  askAndReturnImages(content) {
    return new Promise(async (resolve, reject) => {
      const filesToChoice = fs
        .readdirSync('./')
        .filter(file => {
          const stat = fs.lstatSync(file);
          const [name, ext] = file.split('.');

          return stat.isFile() && supportedImagesExtensions.includes(ext);
        })
        .map(file => {
          return {title: file, value: file};
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
      } catch (error) {
        reject(error);
      }
    });
  },

  async resizeAndRemoveAlphaChannel(content) {
    return new Promise((resolve, reject) => {
      if (!content.files) reject('No selected images');

      const {files, width, height} = content;
      for (const file of files) {
        sharp(file)
          .resize(width, height, {
            fit: 'fill',
            background: {r: 255, g: 255, b: 255, alpha: 1},
          })
          .removeAlpha()
          .toBuffer()
          .then(data =>
            fs.writeFileSync(path.resolve(resizedPathDir, file), data),
          )
          .catch(reject);
      }

      resolve();
    });
  },
};
