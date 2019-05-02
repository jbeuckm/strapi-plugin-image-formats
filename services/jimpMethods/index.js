const JimpMethod = require('./JimpMethod');
const fieldConfigs = require('../../admin/src/jimpMethodConfigs');

module.exports = {
  contain: new JimpMethod('contain', fieldConfigs['contain']),
  cover: new JimpMethod('cover', fieldConfigs['cover']),
  resize: new JimpMethod('resize', fieldConfigs['resize']),
  scaleToFit: new JimpMethod('scaleToFit', fieldConfigs['scaleToFit']),
  crop: new JimpMethod('crop', fieldConfigs['crop']),
  invert: new JimpMethod('invert', {}),
  greyscale: new JimpMethod('greyscale', {}),
  sepia: new JimpMethod('sepia', {}),
  dither565: new JimpMethod('dither565', {}),
  blur: new JimpMethod('blur', fieldConfigs['blur']),
  gaussian: new JimpMethod('gaussian', fieldConfigs['gaussian'])
};
