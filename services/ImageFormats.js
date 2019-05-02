'use strict';

/**
 * ImageFormats.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  getFormattedImage: async ({ imageFormatName, fileId }) => {
    console.log('service.getFormattedImage', { imageFormatName, fileId });
    const [imageFormat, file] = await Promise.all([
      strapi
        .query('imageformat', 'image-formats')
        .findOne({ name: imageFormatName }),

      strapi.plugins['upload'].services['upload'].fetch({ id: fileId })
    ]);

    console.log({ imageFormat, file });
    return imageFormat;
  }
};
