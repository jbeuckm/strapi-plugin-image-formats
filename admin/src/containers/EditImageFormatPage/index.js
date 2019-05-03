import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import pluginId from 'pluginId';
import uuid from 'uuid/v4';

import Button from 'components/Button';
import PluginHeader from 'components/PluginHeader';
import StepEditor from './StepEditor';
import IcoContainer from 'components/IcoContainer';
import Preview from '../../components/Preview';
import InputText from 'components/InputsIndex';

import styles from './styles.scss';
import { loadImageFormat, saveImageFormat } from './actions';
import {
  makeSelectLoading,
  makeSelectImageFormat,
  makeSelectCreated,
  makeSelectSaving
} from './selectors';
import reducer from './reducer';
import saga from './saga';

export class CreateImageFormatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
      steps: []
    };
  }

  componentDidMount() {
    const { imageFormatId } = this.props.match.params;
    imageFormatId && this.props.loadImageFormat(imageFormatId);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.imageFormat && nextProps.imageFormat) {
      this.setState({
        name: nextProps.imageFormat.name,
        description: nextProps.imageFormat.description,
        steps: nextProps.imageFormat.steps
      });
    }

    if (!this.props.created && nextProps.created) {
      this.props.history.push(`/plugins/${pluginId}`);
    }
  }

  onChangeName = event => {
    const submittedValue = event.target.value;
    const lowercase = submittedValue.toLowerCase();
    const replaced = lowercase.replace(/[^a-z0-9]/g, '-');
    this.setState({ name: replaced.substring(0, 16) });
  };
  onChangeDescription = event => {
    this.setState({ description: event.target.value });
  };

  onSaveImageFormat = () => {
    const { imageFormatId } = this.props.match.params;
    const imageFormat = {
      id: imageFormatId,
      name: this.state.name,
      description: this.state.description,
      steps: JSON.stringify(this.state.steps)
    };

    this.props.saveImageFormat(imageFormat);
  };

  addStep = () => {
    this.setState({
      steps: [
        ...this.state.steps,
        { id: uuid(), method: 'contain', params: { width: 100, height: 100 } }
      ]
    });
  };

  removeStep = _id => () => {
    this.setState({
      steps: _.filter(this.state.steps, step => step.id !== _id)
    });
  };

  stepChanged = updated => {
    const newSteps = _.cloneDeep(this.state.steps);

    const index = _.findIndex(newSteps, step => step.id == updated.id);
    newSteps[index] = updated;

    this.setState({ steps: newSteps });
  };

  render() {
    const { loading, saving } = this.props;
    const { name, description, steps } = this.state;

    const saveDisabled = loading || saving || steps == [];

    const previewFormat = {
      name: this.state.name,
      description: this.state.description,
      steps: this.state.steps
    };

    return (
      <div className={styles.editImageFormatPage}>
        <PluginHeader
          title={'Edit Image Format'}
          description={'Define an image processing sequence'}
        />

        <div className="row">
          <div className="col-md-12">
            <Preview imageFormat={previewFormat} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <InputText
              label="Name"
              type="text"
              onChange={this.onChangeName}
              value={name}
            />

            <InputText
              label="Description"
              type="text"
              onChange={this.onChangeDescription}
              value={description}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h3>Steps</h3>
            <table>
              {steps.map(step => (
                <tr className={styles.stepRow} key={step.id}>
                  <td>
                    <StepEditor step={step} onChange={this.stepChanged} />
                  </td>
                  <td>
                    <IcoContainer
                      icons={[
                        {
                          icoType: 'remove',
                          onClick: this.removeStep(step.id)
                        }
                      ]}
                    />
                  </td>
                </tr>
              ))}
              <tr style={{ textAlign: 'right' }}>
                <td colSpan="6">
                  <Button
                    label="Add a step"
                    onClick={this.addStep}
                    secondaryHotlineAdd
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <Button
              label={loading ? 'Loading...' : 'Save Image Format'}
              disabled={saveDisabled}
              onClick={this.onSaveImageFormat}
              primary
            />
          </div>
        </div>
      </div>
    );
  }
}

CreateImageFormatPage.contextTypes = {
  router: PropTypes.object
};

CreateImageFormatPage.propTypes = {
  loadImageFormat: PropTypes.func.isRequired,
  saveImageFormat: PropTypes.func.isRequired,
  imageFormat: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  created: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  loadImageFormat,
  saveImageFormat
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  imageFormat: makeSelectImageFormat(),
  created: makeSelectCreated(),
  saving: makeSelectSaving()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = strapi.injectReducer({
  key: 'createImageFormatPage',
  reducer,
  pluginId
});
const withSaga = strapi.injectSaga({
  key: 'createImageFormatPage',
  saga,
  pluginId
});

export default compose(
  withReducer,
  withSaga,
  withConnect
)(injectIntl(CreateImageFormatPage));
