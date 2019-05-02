import { fromJS } from 'immutable';

import {
  LOAD_IMAGE_FORMAT,
  LOAD_IMAGE_FORMAT_SUCCESS,
  LOAD_IMAGE_FORMAT_ERROR,
  SAVE_IMAGE_FORMAT,
  SAVE_IMAGE_FORMAT_SUCCESS,
  SAVE_IMAGE_FORMAT_ERROR
} from './constants';

const initialState = fromJS({
  loading: false,
  imageFormat: null,
  loadError: null,
  saving: false,
  created: null,
  saveError: null
});

function createImageFormatPageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_IMAGE_FORMAT:
      return state.set('loading', true).set('imageFormat', null);

    case LOAD_IMAGE_FORMAT_SUCCESS: {
      console.log(payload);
      return state
        .set('loading', false)
        .set('imageFormat', payload.imageFormat);
    }

    case LOAD_IMAGE_FORMAT_ERROR:
      return state.set('loading', false).set('loadError', payload);

    case SAVE_IMAGE_FORMAT:
      return state.set('saving', true).set('created', null);

    case SAVE_IMAGE_FORMAT_SUCCESS: {
      console.log(payload);
      return state.set('saving', false).set('created', payload.saved);
    }

    case SAVE_IMAGE_FORMAT_ERROR:
      return state.set('loading', false).set('saveError', payload);

    default:
      return state;
  }
}

export default createImageFormatPageReducer;
