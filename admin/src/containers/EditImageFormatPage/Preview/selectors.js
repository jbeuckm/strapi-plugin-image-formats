import { createSelector } from 'reselect';
import pluginId from 'pluginId';

/**
 * Direct selector to the examplePage state domain
 */
const selectEditImageFormatPageDomain = () => state =>
  state.get(`${pluginId}_createImageFormatPage`);

/**
 * Default selector used by HomePage
 */

const makeSelectLoading = () =>
  createSelector(selectEditImageFormatPageDomain(), substate =>
    substate.get('loading')
  );

const makeSelectImageFormat = () =>
  createSelector(selectEditImageFormatPageDomain(), substate =>
    substate.get('imageFormat')
  );

const makeSelectCreated = () =>
  createSelector(selectEditImageFormatPageDomain(), substate =>
    substate.get('created')
  );

const makeSelectSaving = () =>
  createSelector(selectEditImageFormatPageDomain(), substate =>
    substate.get('saving')
  );

export {
  makeSelectLoading,
  makeSelectImageFormat,
  makeSelectCreated,
  makeSelectSaving
};
