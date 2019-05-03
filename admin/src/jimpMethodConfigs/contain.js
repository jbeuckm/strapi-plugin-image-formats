const Jimp = require('jimp');

const RESIZE_MODES = [
  Jimp.HORIZONTAL_ALIGN_LEFT,
  Jimp.HORIZONTAL_ALIGN_CENTER,
  Jimp.HORIZONTAL_ALIGN_RIGHT,

  Jimp.VERTICAL_ALIGN_TOP,
  Jimp.VERTICAL_ALIGN_MIDDLE,
  Jimp.VERTICAL_ALIGN_BOTTOM
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
  }
  // mode: {
  //   type: 'select',
  //   options: RESIZE_MODES
  // }
};

module.exports = FIELD_CONFIGS;
