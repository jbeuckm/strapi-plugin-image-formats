const relateFileToContent = async ({ fileDescriptor, imageFormatId }) => {
  fileDescriptor.related = [
    {
      refId: imageFormatId,
      ref: 'imageformat',
      source: 'image-formats',
      field: 'formattedFiles'
    }
  ];

  return await strapi.plugins['upload'].services.upload.add(fileDescriptor);
};

module.exports = relateFileToContent;
