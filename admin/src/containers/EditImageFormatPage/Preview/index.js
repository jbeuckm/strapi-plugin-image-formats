import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { injectIntl } from "react-intl";
import { compose } from "redux";
import pluginId from "pluginId";
import styles from "./styles.scss";

import { fetchPreview } from "./actions";
import { makeSelectLoading, makeSelectImageDataUri } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";

import PropTypes from "prop-types";

class Preview extends Component {
  state = { dimensions: null };

  componentDidMount() {
    this.imageNeedsUpdate = true;
    this.updateImageData();
  }

  componentDidUpdate(prevProps) {
    const prevSteps = prevProps.steps;
    const nextSteps = this.props.steps;

    if (!_.isEqual(prevSteps, nextSteps)) {
      this.imageNeedsUpdate = true;
      this.updateImageData();
    }
  }

  updateImageData = async () => {
    if (this.props.loadingImage || !this.imageNeedsUpdate) {
      return;
    }
    this.imageNeedsUpdate = false;

    this.props.fetchPreview(this.props.steps);
  };

  onImageLoaded = event => {
    const { naturalWidth, naturalHeight } = event.target;
    this.setState({ dimensions: `${naturalWidth} x ${naturalHeight}` });

    this.updateImageData();
  };

  render() {
    const { dimensions } = this.state;
    const { imageDataUri } = this.props;

    return (
      <div>
        <div className={styles.container}>
          <div className={styles.dimensions}>{dimensions}</div>
          <img
            src={imageDataUri}
            className={styles.previewImage}
            onLoad={this.onImageLoaded}
          />
        </div>
      </div>
    );
  }
}

Preview.propTypes = {
  steps: PropTypes.array.isRequired,
  fetchPreview: PropTypes.func.isRequired,
  imageDataUri: PropTypes.string.isRequired,
  loading: PropTypes.bool
};

const mapDispatchToProps = {
  fetchPreview
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  imageDataUri: makeSelectImageDataUri()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = strapi.injectReducer({
  key: "imageFormatPreview",
  reducer,
  pluginId
});
const withSaga = strapi.injectSaga({
  key: "imageFormatPreview",
  saga,
  pluginId
});

export default compose(
  withReducer,
  withSaga,
  withConnect
)(injectIntl(Preview));
