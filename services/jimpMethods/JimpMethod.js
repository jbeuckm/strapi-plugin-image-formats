const Joi = require('joi');
const _ = require('lodash');

class JimpMethod {
  constructor(method, fieldConfigs) {
    this.method = method;
    this.fieldConfigs = fieldConfigs;

    this.schema = this.buildMethodSchema(fieldConfigs);
  }

  buildFieldSchema(fieldConfig) {
    switch (fieldConfig.type) {
      case 'integer': {
        let schema = Joi.number().integer();
        if (fieldConfig.min) {
          schema = schema.min(fieldConfig.min);
        }
        if (fieldConfig.max) {
          schema = schema.max(fieldConfig.max);
        }
        if (fieldConfig.required) {
          schema = schema.required();
        }
        return schema;
      }
      case 'select': {
        return Joi.any().valid(fieldConfig.options);
      }
    }
  }

  buildMethodSchema(argumentFields) {
    const schemaKeys = _.mapValues(argumentFields, this.buildFieldSchema);
    return Joi.object().keys(schemaKeys);
  }

  getArgumentsArray(formValues) {
    const validated = Joi.validate(formValues, this.schema);

    if (validated.error) throw validated.error;

    const values = Object.keys(this.fieldConfigs).map(
      fieldName => validated.value[fieldName]
    );

    _.remove(values, _.isNil);

    return values;
  }
}

module.exports = JimpMethod;
