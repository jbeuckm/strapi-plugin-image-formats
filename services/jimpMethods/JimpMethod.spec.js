const JimpMethod = require('./JimpMethod');
const Jimp = require('jimp');

const TEST_OPTIONS = ['ONE', 'TWO', 'THREE'];

const TEST_FIELD_CONFIGS = {
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
  },
  mode: {
    type: 'select',
    options: TEST_OPTIONS
  }
};

describe('JimpMethod', () => {
  it('saves the associated method', () => {
    const step = new JimpMethod('test', TEST_FIELD_CONFIGS);

    expect(step.method).toEqual('test');
  });

  it('preserves order of arguments in the field configs', () => {
    const step = new JimpMethod('test', TEST_FIELD_CONFIGS);

    expect(step.getArgumentsArray({ height: 1, width: 2 })).toEqual([2, 1]);
  });

  it('throws for non-allowed enum value', () => {
    const step = new JimpMethod('test', TEST_FIELD_CONFIGS);

    expect(() =>
      step.getArgumentsArray({ mode: '💩', height: 1, width: 1 })
    ).toThrow();
  });

  it('passes allowed enum value', () => {
    const step = new JimpMethod('test', TEST_FIELD_CONFIGS);

    expect(
      step.getArgumentsArray({
        height: 1,
        width: 2,
        mode: TEST_OPTIONS[0]
      })
    ).toEqual([2, 1, TEST_OPTIONS[0]]);
  });
});
