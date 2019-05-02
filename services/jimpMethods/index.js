const JimpMethod = require('./JimpMethod');
const containFieldConfigs = require('../../admin/src/jimpMethodConfigs/contain');

module.exports = {
  contain: new JimpMethod('contain', containFieldConfigs)
};
