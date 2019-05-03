const Jimp = require('jimp');

const RESIZE_MODES = [
  Jimp.RESIZE_NEAREST_NEIGHBOR,
  Jimp.RESIZE_BILINEAR,
  Jimp.RESIZE_BICUBIC,
  Jimp.RESIZE_HERMITE,
  Jimp.RESIZE_BEZIER
];

const FIELD_CONFIGS = {
  width: {
    type: 'integer',
    min: 1,
    max: 4096,
    required: true,
    default: 150
  },
  height: {
    type: 'integer',
    min: 1,
    max: 4096,
    required: true,
    default: 150
  },
  mode: {
    type: 'select',
    options: RESIZE_MODES
  }
};

module.exports = FIELD_CONFIGS;
