'use strict';
const getUploadProvider = require('./utils/upload/getUploadProvider');
const getFileDescriptor = require('./utils/upload/getFileDescriptor');
const relateFileToContent = require('./utils/upload/relateFileToContent');

const Jimp = require('jimp');
const jimpMethods = require('./jimpMethods');
/**
 * ImageFormats.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  preview: async ({ imageFormat }) => {
    const image = await Jimp.read(`${__dirname}/sample_photo.jpg`);

    imageFormat.steps.forEach(({ method, params }) => {
      const methodFunction = image[method];
      const args = jimpMethods[method].getArgumentsArray(params);
      methodFunction.apply(image, args);
    });

    const buffer = await image.getBufferAsync(Jimp.AUTO);
    return { mime: image.getMIME(), buffer };
  },

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

    imageFormat.steps.forEach(({ method, params }) => {
      const methodFunction = image[method];
      const args = jimpMethods[method].getArgumentsArray(params);
      methodFunction.apply(image, args);
    });

    const buffer = await image.getBufferAsync(Jimp.AUTO);

    strapi.plugins['image-formats'].services[
      'imageformats'
    ].cacheFormattedImage({ imageFormat, originalFile: file, buffer });

    return { mime: image.getMIME(), buffer };
  },

  cacheFormattedImage: async ({ imageFormat, originalFile, buffer }) => {
    const fileDescriptor = getFileDescriptor({
      mimeType: originalFile.mime,
      extension: originalFile.ext.replace('.', ''),
      buffer
    });

    const { actions, provider } = await getUploadProvider();

    await actions.upload(fileDescriptor);

    delete fileDescriptor.buffer;

    fileDescriptor.provider = provider.provider;

    await relateFileToContent({
      imageFormatId: imageFormat.id,
      fileDescriptor
    });
  }
};
