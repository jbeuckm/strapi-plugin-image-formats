import React, { Component } from 'react';
import Button from 'components/Button';
import IcoContainer from 'components/IcoContainer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import pluginId from 'pluginId';
import PluginHeader from 'components/PluginHeader';

import {
  selectImageFormats,
  selectImageFormatsError,
  selectImageFormatsLoading
} from './selectors';

import styles from './styles.scss';

import { loadImageFormats, deleteImageFormat } from './actions';
import reducer from './reducer';
import saga from './saga';

export class HomePage extends Component {
  componentDidMount() {
    this.props.loadImageFormats();
  }

  navigateToCreateImageFormat = () => {
    this.props.history.push(`/plugins/${pluginId}/create`);
  };

  navigateToEditImageFormat = imageFormatId => () => {
    this.props.history.push(`/plugins/${pluginId}/edit/${imageFormatId}`);
  };

  deleteImageFormat = id => () => {
    this.props.deleteImageFormat(id);
  };

  render() {
    const { imageFormats } = this.props;

    return (
      <div className={styles.homePage}>
        <PluginHeader title={'Image Formats'} />

        <Button
          label="Create a new Image Format"
          onClick={this.navigateToCreateImageFormat}
          secondaryHotlineAdd
        />

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {imageFormats &&
              imageFormats.map(item => {
                return (
                  <tr className={item.ongoing ? styles.inProgress : null}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      <IcoContainer
                        icons={[
                          {
                            icoType: 'pencil',
                            onClick: this.navigateToEditImageFormat(item.id)
                          },
                          {
                            icoType: 'trash',
                            onClick: this.deleteImageFormat(item.id)
                          }
                        ]}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

HomePage.contextTypes = {
  router: PropTypes.object
};

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
  loadImageFormats: PropTypes.func.isRequired,
  imageFormats: PropTypes.array,
  deleteImageFormat: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  loadImageFormats,
  deleteImageFormat
};

const mapStateToProps = createStructuredSelector({
  imageFormats: selectImageFormats(),
  loading: selectImageFormatsLoading(),
  error: selectImageFormatsError()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = strapi.injectReducer({
  key: 'homePage',
  reducer,
  pluginId
});
const withSaga = strapi.injectSaga({ key: 'homePage', saga, pluginId });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(injectIntl(HomePage));
