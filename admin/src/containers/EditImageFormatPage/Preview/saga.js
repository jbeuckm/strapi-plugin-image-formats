import { fork, takeLatest, call, put } from "redux-saga/effects";
import request from "utils/request";

import { fetchPreviewError, fetchPreviewSuccess } from "./actions";
import { FETCH_PREVIEW } from "./constants";

export function* fetchPreviewSaga(event) {
  try {
    const { steps } = event.payload;

    const response = yield call(request, `/image-formats/preview`, {
      method: "POST",
      body: { steps }
    });

    console.log({ response });

    yield put(fetchPreviewSuccess(response));

    //    yield put(fetchPreviewError(saved));
  } catch (error) {
    strapi.notification.error("notification.error");
    yield put(fetchPreviewError(error));
  }
}

export function* defaultSaga() {
  yield fork(takeLatest, FETCH_PREVIEW, fetchPreviewSaga);
}

export default defaultSaga;
