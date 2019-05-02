import { fork, takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';

import {
  loadImageFormatError,
  loadImageFormatSuccess,
  saveImageFormatError,
  saveImageFormatSuccess
} from './actions';
import { LOAD_IMAGE_FORMAT, SAVE_IMAGE_FORMAT } from './constants';

export function* loadImageFormat(event) {
  try {
    const { imageFormatId } = event.payload;

    const imageFormat = yield call(request, `/image-formats/${imageFormatId}`, {
      method: 'GET'
    });

    yield put(loadImageFormatSuccess(imageFormat));
  } catch (error) {
    strapi.notification.error('notification.error');
    yield put(loadImageFormatError(error));
  }
}

export function* saveImageFormat(event) {
  try {
    const { imageFormat } = event.payload;

    const saved = yield call(request, '/image-formats', {
      method: 'POST',
      body: imageFormat
    });

    yield put(saveImageFormatSuccess(saved));
  } catch (error) {
    strapi.notification.error('notification.error');
    yield put(saveImageFormatError(error));
  }
}

export function* defaultSaga() {
  yield fork(takeLatest, LOAD_IMAGE_FORMAT, loadImageFormat);
  yield fork(takeLatest, SAVE_IMAGE_FORMAT, saveImageFormat);
}

export default defaultSaga;
