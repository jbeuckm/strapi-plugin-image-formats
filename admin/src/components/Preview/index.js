import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  container: {
    width: 600,
    textAlign: 'center'
  },
  previewImage: {
    maxHeight: 250,
    maxWidth: 600
  },
  dimensions: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic'
  }
};

function _arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

class Preview extends Component {
  state = { imageData: null, dimensions: null };

  componentDidMount() {
    this.loadingImage = false;
    this.imageNeedsUpdate = true;
    this.updateImageData();
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.imageFormat.steps, prevProps.imageFormat.steps)) {
      this.imageNeedsUpdate = true;
      this.updateImageData();
    }
  }

  updateImageData = async () => {
    if (this.loadingImage || !this.imageNeedsUpdate) return;
    this.imageNeedsUpdate = false;

    this.loadingImage = true;

    try {
      const response = await fetch('/image-formats/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.props.imageFormat)
      });

      const buffer = await response.arrayBuffer();
      const imageData = _arrayBufferToBase64(buffer);

      this.setState(
        {
          imageData: `data:image/jpeg;charset=utf-8;base64,${imageData}`
        },
        this.updateImageData
      );
    } catch (error) {
      console.log({ error });
    }

    this.loadingImage = false;
  };

  onImageLoaded = event => {
    const { naturalWidth, naturalHeight } = event.target;
    this.setState({ dimensions: `${naturalWidth} x ${naturalHeight}` });
  };

  render() {
    const { imageData, dimensions } = this.state;

    return (
      <div>
        <div style={styles.container}>
          <div style={styles.dimensions}>{dimensions}</div>
          <img
            src={imageData}
            style={styles.previewImage}
            onLoad={this.onImageLoaded}
          />
        </div>
      </div>
    );
  }
}

Preview.propTypes = {
  imageFormat: PropTypes.object.isRequired
};

export default Preview;
