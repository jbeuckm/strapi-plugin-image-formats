const FIELD_CONFIGS = {
  x: {
    type: 'integer',
    min: 1,
    max: 4096,
    required: true
  },
  y: {
    type: 'integer',
    min: 1,
    max: 4096,
    required: true
  },
  width: {
    type: 'integer',
    min: 1,
    max: 4096,
    required: true
  },
  height: {
    type: 'integer',
    min: 1,
    max: 4096,
    required: true
  }
};

module.exports = FIELD_CONFIGS;
