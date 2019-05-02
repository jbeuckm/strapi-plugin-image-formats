'use strict';
const getUploadProvider = require('./utils/getUploadProvider');
const Jimp = require('jimp');

/**
 * ImageFormats.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  getFormattedImage: async ({ imageFormatName, fileId }) => {
    const [imageFormat, file] = await Promise.all([
      strapi
        .query('imageformat', 'image-formats')
        .findOne({ name: imageFormatName }),

      strapi.plugins['upload'].services['upload'].fetch({ id: fileId })
    ]);

    const uploadProvider = await getUploadProvider();
    const url = uploadProvider.getPath(file);
    const image = await Jimp.read(url);

    console.log(imageFormat);

    const buffer = await image.getBufferAsync(Jimp.AUTO);
    return { mime: file.mime, buffer };
  }
};
