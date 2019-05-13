import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { injectIntl } from "react-intl";
import { compose } from "redux";
import pluginId from "pluginId";
import styles from "./styles.scss";

import { fetchPreview } from "./actions";
import { makeSelectImageDataUri } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";

import PropTypes from "prop-types";

class Preview extends Component {
  state = { imageData: null, dimensions: null };

  componentDidMount() {
    this.loadingImage = false;
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
    if (this.loadingImage || !this.imageNeedsUpdate) {
      return;
    }
    this.imageNeedsUpdate = false;

    this.loadingImage = true;

    this.props.fetchPreview(this.props.steps);
    /*
    try {
      const response = await fetch("/image-formats/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: { steps: this.props.steps }
      });

      const buffer = await response.arrayBuffer();
      const imageData = _arrayBufferToBase64(buffer);

      this.loadingImage = false;

      this.setState(
        {
          imageData: `data:image/jpeg;charset=utf-8;base64,${imageData}`
        },
        this.updateImageData
      );
    } catch (error) {
      this.loadingImage = false;
      console.log({ error });
    }
    */
  };

  onImageLoaded = event => {
    const { naturalWidth, naturalHeight } = event.target;
    this.setState({ dimensions: `${naturalWidth} x ${naturalHeight}` });
  };

  render() {
    const { imageData, dimensions } = this.state;

    return (
      <div>
        <div className={styles.container}>
          <div className={styles.dimensions}>{dimensions}</div>
          <img
            src={imageData}
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
  imageDataUri: PropTypes.string.isRequired
};

const mapDispatchToProps = {
  fetchPreview
};

const mapStateToProps = createStructuredSelector({
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
