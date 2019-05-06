'use strict';

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  // beforeSave: async (model) => {},
  // After saving a value.
  // Fired after an `insert` or `update` query.
  // afterSave: async (model, result) => {},
  // Before fetching all values.
  // Fired before a `fetchAll` operation.
  // beforeFetchAll: async (model) => {},
  // After fetching all values.
  // Fired after a `fetchAll` operation.
  // afterFetchAll: async (model, results) => {},
  // Fired before a `fetch` operation.
  // beforeFetch: async (model) => {},
  // After fetching a value.
  // Fired after a `fetch` operation.
  // afterFetch: async (model, result) => {},
  // Before creating a value.
  // Fired before `insert` query.
  // beforeCreate: async (model) => {},
  // After creating a value.
  // Fired after `insert` query.
  // afterCreate: async (model, result) => {},
  // Before updating a value.
  // Fired before an `update` query.
  // beforeUpdate: async (model) => {},
  // After updating a value.
  // Fired after an `update` query.
  afterUpdate: async (model, result) => {
    resetFormattedImageCache(model);
  },
  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model) => {},
  // After destroying a value.
  // Fired after a `delete` query.
  afterDestroy: async (model, result) => {
    resetFormattedImageCache(model);
  }
};

const resetFormattedImageCache = async imageFormat => {
  const formattedImages = await strapi
    .query('formattedimage', 'image-formats')
    .find({ imageFormatId: imageFormat.id });

  formattedImages.forEach(async record => {
    strapi.query('formattedimage', 'image-formats').delete({
      id: record.id
    });

    const fileid = record.file[0].id;

    const uploadProviderConfig = await strapi
      .store({
        environment: strapi.config.environment,
        type: 'plugin',
        name: 'upload'
      })
      .get({ key: 'provider' });

    strapi.plugins['upload'].services['upload'].remove(
      { id: fileid },
      uploadProviderConfig
    );
  });
};
