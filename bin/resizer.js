#!/usr/bin/env node
const {
  createCopyDir,
  askAndReturnImages,
  askAndReturnWhichSize,
  resizeAndRemoveAlphaChannel,
  askCustomWidthAndHeight,
} = require('../lib');

askAndReturnWhichSize()
  .then(askCustomWidthAndHeight)
  .then(askAndReturnImages)
  .then(createCopyDir)
  .then(resizeAndRemoveAlphaChannel);
