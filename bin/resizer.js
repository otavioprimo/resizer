#!/usr/bin/env node
const {
  createCopyDir,
  askAndReturnImages,
  askAndReturnWhichSize,
  resizeAndRemoveAlphaChannel,
  askCustomWidthAndHeight
} = require('../lib');

askAndReturnWhichSize()
  .then(createCopyDir)
  .then(askCustomWidthAndHeight)
  .then(askAndReturnImages)
  .then(resizeAndRemoveAlphaChannel);
