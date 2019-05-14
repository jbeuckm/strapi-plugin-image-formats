"use strict";
const getUploadProvider = require("./utils/upload/getUploadProvider");
const getFileDescriptor = require("./utils/upload/getFileDescriptor");
const relateFileToContent = require("./utils/upload/relateFileToContent");

const Jimp = require("jimp");
const jimpMethods = require("./jimpMethods");
const fs = require("fs");

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

  retrieveCachedFormattedImage: async ({ imageFormat, fileId }) => {
    const record = await strapi
      .query("formattedimage", "image-formats")
      .findOne({ imageFormatId: imageFormat.id, originalFileId: fileId });

    return record && record.file[0];
  },

  getFormattedImage: async ({ imageFormatName, fileId }) => {
    const [imageFormat, uploadProvider] = await Promise.all([
      strapi
        .query("imageformat", "image-formats")
        .findOne({ name: imageFormatName }),
      getUploadProvider()
    ]);

    const cachedImage = await strapi.plugins["image-formats"].services[
      "imageformats"
    ].retrieveCachedFormattedImage({ imageFormat, fileId });

    if (cachedImage) {
      const url = uploadProvider.getPath(cachedImage);
      const buffer = fs.readFileSync(url);
      return { mime: cachedImage.mime, buffer };
    }

    const file = await strapi.plugins["upload"].services["upload"].fetch({
      id: fileId
    });

    const url = uploadProvider.getPath(file);
    const image = await Jimp.read(url);

    imageFormat.steps.forEach(({ method, params }) => {
      const methodFunction = image[method];
      const args = jimpMethods[method].getArgumentsArray(params);
      methodFunction.apply(image, args);
    });

    const buffer = await image.getBufferAsync(Jimp.AUTO);

    strapi.plugins["image-formats"].services[
      "imageformats"
    ].cacheFormattedImage({ imageFormat, originalFile: file, buffer });

    return { mime: image.getMIME(), buffer };
  },

  cacheFormattedImage: async ({ imageFormat, originalFile, buffer }) => {
    const fileDescriptor = getFileDescriptor({
      mimeType: originalFile.mime,
      extension: originalFile.ext.replace(".", ""),
      buffer
    });

    const { actions, provider } = await getUploadProvider();

    await actions.upload(fileDescriptor);

    delete fileDescriptor.buffer;

    fileDescriptor.provider = provider.provider;

    const formattedImage = await strapi
      .query("formattedimage", "image-formats")
      .create({
        imageFormatId: imageFormat.id,
        originalFileId: originalFile.id
      });

    await relateFileToContent({
      fileDescriptor,
      referringField: "file",
      referringContentSource: "image-formats",
      referringModel: "formattedimage",
      referringId: formattedImage.id
    });
  }
};
