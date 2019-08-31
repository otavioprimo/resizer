#!/usr/bin/env node
const {
  createCopyDir,
  askAndReturnImages,
  askAndReturnWhichSize,
  resizeAndRemoveAlphaChannel,
} = require('../lib');

askAndReturnWhichSize()
  .then(createCopyDir)
  .then(askAndReturnImages)
  .then(resizeAndRemoveAlphaChannel);
