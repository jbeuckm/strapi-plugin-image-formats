import { fromJS } from "immutable";

import {
  FETCH_PREVIEW,
  FETCH_PREVIEW_ERROR,
  FETCH_PREVIEW_SUCCESS
} from "./constants";

const initialState = fromJS({
  loading: false,
  error: null,
  imageDataUri: null
});

function previewImageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PREVIEW:
      return state
        .set("error", null)
        .set("loading", true)
        .set("imageDataUri", null);

    case FETCH_PREVIEW_SUCCESS: {
      return state
        .set("loading", false)
        .set("imageDataUri", payload.imageDataUri);
    }

    case FETCH_PREVIEW_ERROR:
      return state.set("loading", false).set("error", payload);

    default:
      return state;
  }
}

export default previewImageReducer;
