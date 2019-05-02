const contain = require('./contain');
const crop = require('./crop');

module.exports = {
  contain,
  cover: contain,
  resize: contain,
  scaleToFit: contain,
  crop,
  invert: {},
  greyscale: {},
  sepia: {},
  dither565: {}
};
