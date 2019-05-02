import {
  LOAD_IMAGE_FORMATS,
  LOAD_IMAGE_FORMATS_ERROR,
  LOAD_IMAGE_FORMATS_SUCCESS,
  UNDO_IMPORT,
  UNDO_IMPORT_SUCCESS,
  UNDO_IMPORT_ERROR,
  DELETE_IMPORT,
  DELETE_IMPORT_SUCCESS,
  DELETE_IMPORT_ERROR
} from './constants';

export const loadImageFormats = () => ({
  type: LOAD_IMAGE_FORMATS
});
export const loadImageFormatsSuccess = imageFormats => ({
  type: LOAD_IMAGE_FORMATS_SUCCESS,
  payload: { imageFormats }
});
export const loadImageFormatsError = error => ({
  type: LOAD_IMAGE_FORMATS_ERROR,
  payload: error,
  error: true
});

export const undoImport = id => ({
  type: UNDO_IMPORT,
  payload: { id }
});
export const undoImportSuccess = () => ({
  type: UNDO_IMPORT_SUCCESS
});
export const undoImportError = error => ({
  type: UNDO_IMPORT_ERROR,
  payload: error,
  error: true
});

export const deleteImageFormat = id => ({
  type: DELETE_IMPORT,
  payload: { id }
});
export const deleteImageFormatSuccess = () => ({
  type: DELETE_IMPORT_SUCCESS
});
export const deleteImageFormatError = error => ({
  type: DELETE_IMPORT_ERROR,
  payload: error,
  error: true
});
