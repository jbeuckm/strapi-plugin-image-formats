import {
  FETCH_PREVIEW,
  FETCH_PREVIEW_ERROR,
  FETCH_PREVIEW_SUCCESS
} from "./constants";

export const fetchPreview = steps => ({
  type: FETCH_PREVIEW,
  payload: { steps }
});
export const fetchPreviewSuccess = imageDataUri => ({
  type: FETCH_PREVIEW_SUCCESS,
  payload: { imageDataUri }
});
export const fetchPreviewError = error => ({
  type: FETCH_PREVIEW_ERROR,
  error: true,
  payload: error
});
