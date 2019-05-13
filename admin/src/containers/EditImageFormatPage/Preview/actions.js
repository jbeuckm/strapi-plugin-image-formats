import {
  LOAD_IMAGE_FORMAT,
  LOAD_IMAGE_FORMAT_ERROR,
  LOAD_IMAGE_FORMAT_SUCCESS,
  SAVE_IMAGE_FORMAT,
  SAVE_IMAGE_FORMAT_ERROR,
  SAVE_IMAGE_FORMAT_SUCCESS
} from './constants';

export const loadImageFormat = imageFormatId => ({
  type: LOAD_IMAGE_FORMAT,
  payload: { imageFormatId }
});
export const loadImageFormatSuccess = imageFormat => ({
  type: LOAD_IMAGE_FORMAT_SUCCESS,
  payload: { imageFormat }
});
export const loadImageFormatError = error => ({
  type: LOAD_IMAGE_FORMAT_ERROR,
  error: true,
  payload: error
});

export const saveImageFormat = imageFormat => ({
  type: SAVE_IMAGE_FORMAT,
  payload: { imageFormat }
});
export const saveImageFormatSuccess = saved => ({
  type: SAVE_IMAGE_FORMAT_SUCCESS,
  payload: { saved }
});
export const saveImageFormatError = error => ({
  type: SAVE_IMAGE_FORMAT_ERROR,
  error: true,
  payload: error
});
