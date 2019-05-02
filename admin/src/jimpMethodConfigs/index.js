const contain = require('./contain');
const crop = require('./crop');
const blur = require('./blur');

module.exports = {
  contain,
  cover: contain,
  resize: contain,
  scaleToFit: contain,
  crop,
  invert: {},
  greyscale: {},
  sepia: {},
  dither565: {},
  blur,
  gaussian: blur
};
