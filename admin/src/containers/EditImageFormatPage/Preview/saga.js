import { fork, takeLatest, call, put } from "redux-saga/effects";
import auth from "utils/auth";

import { fetchPreviewError, fetchPreviewSuccess } from "./actions";
import { FETCH_PREVIEW } from "./constants";

function _arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function* fetchPreviewSaga(event) {
  try {
    const { steps } = event.payload;
    console.log("fetchPreviewSaga", { steps });

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
        "Content-Type": "application/json"
      },
      body: { steps }
    };
    console.log({ options });

    const request = () =>
      fetch(`${strapi.backendURL}/image-formats/preview`, options);

    const response = yield call(request);

    const buffer = response.arrayBuffer();
    console.log({ buffer });
    const imageData = _arrayBufferToBase64(buffer);

    const imageDataUri = `data:image/jpeg;charset=utf-8;base64,${imageData}`;

    console.log(imageDataUri);

    yield put(fetchPreviewSuccess(imageDataUri));

    //    yield put(fetchPreviewError(saved));
  } catch (error) {
    console.log({ error });
    strapi.notification.error("notification.error");
    yield put(fetchPreviewError(error));
  }
}

export function* defaultSaga() {
  yield fork(takeLatest, FETCH_PREVIEW, fetchPreviewSaga);
}

export default defaultSaga;
