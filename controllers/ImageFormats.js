'use strict';

/**
 * ImageFormats.js controller
 *
 * @description: A set of functions called "actions" of the `image-formats` plugin.
 */

module.exports = {
  index: async ctx => {
    const entries = await strapi.query('imageformat', 'image-formats').find();

    ctx.send(entries);
  },

  create: async ctx => {
    const imageFormat = ctx.request.body;
    console.log('create', imageFormat);

    const entry = await strapi
      .query('imageformat', 'image-formats')
      .create(imageFormat);

    ctx.send(entry);
  },

  fetch: async ctx => {
    const imageFormatId = ctx.params.imageFormatId;

    const model = await strapi.query('imageformat', 'image-formats').findOne({
      id: imageFormatId
    });

    ctx.send(model);
  },

  delete: async ctx => {
    const imageFormatId = ctx.params.imageFormatId;

    await strapi.query('imageformat', 'image-formats').delete({
      id: imageFormatId
    });

    ctx.send({ message: 'ok' });
  },

  /**
   * Default action.
   *
   * @return {Object}
   */
  getFormattedImage: async ctx => {
    const { imageFormatName, fileId } = ctx.params;

    const result = await strapi.plugins['image-formats'].services[
      'imageformats'
    ].getFormattedImage({ imageFormatName, fileId });

    ctx.send(result);
  }
};
