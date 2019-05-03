const FIELD_CONFIGS = {
  x: {
    type: 'integer',
    min: 1,
    max: 4096,
    required: true,
    default: 1
  },
  y: {
    type: 'integer',
    min: 1,
    max: 4096,
    required: true,
    default: 1
  },
  width: {
    type: 'integer',
    min: 1,
    max: 4096,
    required: true,
    default: 100
  },
  height: {
    type: 'integer',
    min: 1,
    max: 4096,
    required: true,
    default: 100
  }
};

module.exports = FIELD_CONFIGS;
