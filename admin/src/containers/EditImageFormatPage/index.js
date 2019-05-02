import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import pluginId from 'pluginId';

import Button from 'components/Button';
import PluginHeader from 'components/PluginHeader';

import styles from './styles.scss';
import { loadImageFormat, saveImageFormat } from './actions';
import {
  makeSelectLoading,
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

  componentWillReceiveProps(nextProps) {
    if (!this.props.created && nextProps.created) {
      this.props.history.push(`/plugins/${pluginId}`);
    }
  }

  onChangeName = event => {
    this.setState({ name: event.target.value });
  };
  onChangeDescription = event => {
    this.setState({ description: event.target.value });
  };

  onSaveImageFormat = () => {
    const imageFormat = {
      name: this.state.name,
      description: this.state.description,
      steps: this.state.steps
    };

    this.props.saveImageFormat(imageFormat);
  };

  render() {
    const { loading, saving } = this.props;
    const { name, description, steps } = this.state;

    const saveDisabled = loading || saving || steps == [];

    return (
      <div className={styles.editImageFormatPage}>
        <PluginHeader
          title={'Edit Image Format'}
          description={'Define an image processing sequence'}
        />

        <div className="row">
          <div className="col-md-12">
            Name:
            <input
              className={styles.urlInput}
              onChange={this.onChangeName}
              value={name}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            Description:
            <textarea
              className={styles.urlInput}
              onChange={this.onChangeDescription}
              value={description}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">{JSON.stringify(steps)}</div>
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
