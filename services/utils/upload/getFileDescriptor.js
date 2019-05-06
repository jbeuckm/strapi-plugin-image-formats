const crypto = require('crypto');
const uuid = require('uuid/v4');

function niceHash(buffer) {
  return crypto
    .createHash('sha256')
    .update(buffer)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\//g, '-')
    .replace(/\+/, '_');
}

const getFileDescriptor = ({ mimeType, extension, buffer }) => {
  const fid = uuid();

  return {
    buffer,
    sha256: niceHash(buffer),
    hash: fid.replace(/-/g, ''),

    name: `${fid}.${extension}`,
    ext: `.${extension}`,
    mime: mimeType,
    size: (buffer.length / 1000).toFixed(2)
  };
};

module.exports = getFileDescriptor;
