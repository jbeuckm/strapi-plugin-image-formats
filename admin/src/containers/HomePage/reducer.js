import { fromJS } from 'immutable';

import {
  LOAD_IMAGE_FORMATS,
  LOAD_IMAGE_FORMATS_SUCCESS,
  LOAD_IMAGE_FORMATS_ERROR
} from './constants';

const initialState = fromJS({
  imageFormats: null,
  loading: false,
  error: null
});

function homePageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_IMAGE_FORMATS:
      return state.set('loading', true);

    case LOAD_IMAGE_FORMATS_SUCCESS:
      return state
        .set('loading', false)
        .set('imageFormats', payload.imageFormats);

    case LOAD_IMAGE_FORMATS_ERROR:
      return state.set('loading', false).set('error', payload);

    default:
      return state;
  }
}

export default homePageReducer;
