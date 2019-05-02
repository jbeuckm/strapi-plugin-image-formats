import { fork, takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';

import {
  loadImageFormats,
  loadImageFormatsSuccess,
  loadImageFormatsError,
  undoImportError,
  undoImportSuccess,
  deleteImageFormatError,
  deleteImageFormatSuccess
} from './actions';
import { LOAD_IMAGE_FORMATS, DELETE_IMPORT, UNDO_IMPORT } from './constants';

export function* loadImageFormatsSaga() {
  try {
    const imageFormats = yield call(request, '/image-formats', {
      method: 'GET'
    });

    yield put(loadImageFormatsSuccess(imageFormats));
  } catch (error) {
    strapi.notification.error('notification.error');
    yield put(loadImageFormatsError(error));
  }
}

export function* deleteImageFormatSaga(event) {
  const { id } = event.payload;

  try {
    const imageFormats = yield call(request, `/image-formats/${id}`, {
      method: 'DELETE'
    });

    yield put(deleteImageFormatSuccess(imageFormats));
    yield put(loadImageFormats());
  } catch (error) {
    strapi.notification.error('notification.error');
    yield put(deleteImageFormatError(error));
  }
}

export function* undoImportSaga(event) {
  const { id } = event.payload;

  try {
    const imageFormats = yield call(request, `/image-formats/${id}/undo`, {
      method: 'POST'
    });

    yield put(undoImportSuccess(imageFormats));
    yield put(loadImageFormats());
  } catch (error) {
    strapi.notification.error('notification.error');
    yield put(undoImportError(error));
  }
}

export function* defaultSaga() {
  yield fork(takeLatest, LOAD_IMAGE_FORMATS, loadImageFormatsSaga);
  yield fork(takeLatest, UNDO_IMPORT, undoImportSaga);
  yield fork(takeLatest, DELETE_IMPORT, deleteImageFormatSaga);
}

export default defaultSaga;
