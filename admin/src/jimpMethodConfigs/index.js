const contain = require('./contain');
const crop = require('./crop');
const blur = require('./blur');
const pixelate = require('./pixelate');

module.exports = {
  contain,
  cover: contain,
  resize: contain,
  scaleToFit: contain,
  crop,
  invert: {},
  greyscale: {},
  sepia: {},
  normalize: {},
  dither565: {},
  blur,
  gaussian: blur,
  pixelate
};
