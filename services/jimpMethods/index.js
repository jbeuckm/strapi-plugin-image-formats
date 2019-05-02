const JimpMethod = require('./JimpMethod');
const containFieldConfigs = require('../../admin/src/jimpMethodConfigs/contain');

module.exports = {
  contain: new JimpMethod('contain', containFieldConfigs),
  invert: new JimpMethod('invert', {}),
  greyscale: new JimpMethod('greyscale', {}),
  sepia: new JimpMethod('sepia', {})
};
