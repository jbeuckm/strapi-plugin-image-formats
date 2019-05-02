import { createSelector } from 'reselect';
import pluginId from 'pluginId';
/**
 * Direct selector to the homePage state domain
 */
const selectHomePageDomain = () => state => state.get(`${pluginId}_homePage`);

/**
 * Default selector used by HomePage
 */

export const selectImageFormats = () =>
  createSelector(selectHomePageDomain(), substate =>
    substate.get('imageFormats')
  );

export const selectImageFormatsError = () =>
  createSelector(selectHomePageDomain(), substate => substate.get('error'));

export const selectImageFormatsLoading = () =>
  createSelector(selectHomePageDomain(), substate => substate.get('loading'));
