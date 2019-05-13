import pluginId from 'pluginId';

const buildString = suffix => `${pluginId}/EditImageFormatPage/${suffix}`;

export const LOAD_IMAGE_FORMAT = buildString('LOAD_IMAGE_FORMAT');
export const LOAD_IMAGE_FORMAT_SUCCESS = buildString(
  'LOAD_IMAGE_FORMAT_SUCCESS'
);
export const LOAD_IMAGE_FORMAT_ERROR = buildString('LOAD_IMAGE_FORMAT_ERROR');

export const SAVE_IMAGE_FORMAT = buildString('SAVE_IMAGE_FORMAT');
export const SAVE_IMAGE_FORMAT_SUCCESS = buildString(
  'SAVE_IMAGE_FORMAT_SUCCESS'
);
export const SAVE_IMAGE_FORMAT_ERROR = buildString('SAVE_IMAGE_FORMAT_ERROR');
