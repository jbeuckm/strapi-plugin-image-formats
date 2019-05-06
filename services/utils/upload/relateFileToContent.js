const relateFileToContent = async ({
  fileDescriptor,
  referringField,
  referringContentSource,
  referringModel,
  referringId
}) => {
  fileDescriptor.related = [
    {
      refId: referringId,
      ref: referringModel,
      source: referringContentSource,
      field: referringField
    }
  ];

  return await strapi.plugins['upload'].services.upload.add(fileDescriptor);
};

module.exports = relateFileToContent;
