import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import jimpMethodConfigs from '../../../jimpMethodConfigs';

class StepEditor extends Component {
  constructor(props) {
    super(props);

    this.state = props.step;
  }

  reportChanged = () => {
    this.props.onChange(this.state);
  };

  onChangeMethod = event => {
    this.setState({ method: event.target.value }, this.reportChanged);
  };

  onChangeValue = (argumentName, newValue) => {
    this.setState(
      {
        params: {
          ...this.state.params,
          [argumentName]: newValue
        }
      },
      this.reportChanged
    );
  };

  renderInput = (argumentName, config) => {
    const value = this.state.params[argumentName];

    switch (config.type) {
      case 'integer':
        return (
          <input
            type="number"
            min={config.min}
            max={config.max}
            value={value}
            onChange={event =>
              this.onChangeValue(argumentName, parseFloat(event.target.value))
            }
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={event =>
              this.onChangeValue(argumentName, event.target.value)
            }
          >
            {config.options.map(option => (
              <option value={option}>{option}</option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  render() {
    const argumentConfigs = jimpMethodConfigs[this.state.method];

    return (
      <div>
        <select onChange={this.onChangeMethod}>
          {Object.keys(jimpMethodConfigs).map(method => (
            <option value={method}>{method}</option>
          ))}
        </select>

        {Object.keys(argumentConfigs).map(argumentName => {
          const config = argumentConfigs[argumentName];

          return (
            <span>
              <label>{argumentName}</label>
              {this.renderInput(argumentName, config)}
            </span>
          );
        })}
      </div>
    );
  }
}

StepEditor.propTypes = {
  step: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default StepEditor;
