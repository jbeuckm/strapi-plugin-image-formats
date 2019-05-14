"use strict";

/**
 * ImageFormats.js controller
 *
 * @description: A set of functions called "actions" of the `image-formats` plugin.
 */

module.exports = {
  index: async ctx => {
    const entries = await strapi.query("imageformat", "image-formats").find();

    ctx.send(entries);
  },

  preview: async ctx => {
    const imageFormat = ctx.request.body;

    const { mime, buffer } = await strapi.plugins["image-formats"].services[
      "imageformats"
    ].preview({ imageFormat });

    ctx.set("Content-Type", mime);
    ctx.send(buffer);
  },

  create: async ctx => {
    const imageFormat = ctx.request.body;
    console.log("create", imageFormat);

    const entry = await strapi
      .query("imageformat", "image-formats")
      .create(imageFormat);

    ctx.send(entry);
  },

  fetch: async ctx => {
    const imageFormatId = ctx.params.imageFormatId;

    const model = await strapi.query("imageformat", "image-formats").findOne({
      id: imageFormatId
    });

    ctx.send(model);
  },

  update: async ctx => {
    const imageFormatId = ctx.params.imageFormatId;
    const updatedModel = ctx.request.body;
    console.log("create", updatedModel);

    const model = await strapi.query("imageformat", "image-formats").update(
      {
        id: imageFormatId
      },
      updatedModel
    );

    ctx.send(model);
  },

  delete: async ctx => {
    const imageFormatId = ctx.params.imageFormatId;

    await strapi.query("imageformat", "image-formats").delete({
      id: imageFormatId
    });

    ctx.send({ message: "ok" });
  },

  /**
   * Default action.
   *
   * @return {Object}
   */
  getFormattedImage: async ctx => {
    const { imageFormatName, fileId } = ctx.params;

    const { mime, buffer } = await strapi.plugins["image-formats"].services[
      "imageformats"
    ].getFormattedImage({ imageFormatName, fileId });

    ctx.set("Content-Type", mime);
    ctx.send(buffer);
  }
};
