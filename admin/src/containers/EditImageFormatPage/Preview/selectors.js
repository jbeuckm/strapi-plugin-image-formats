import { createSelector } from "reselect";
import pluginId from "pluginId";

/**
 * Direct selector to the examplePage state domain
 */
const selectImagePreviewDomain = () => state =>
  state.get(`${pluginId}_imageFormatPreview`);

/**
 * Default selector used by HomePage
 */

const makeSelectLoading = () =>
  createSelector(
    selectImagePreviewDomain(),
    substate => substate.get("loading")
  );

const makeSelectImageDataUri = () =>
  createSelector(
    selectImagePreviewDomain(),
    substate => substate.get("imageDataUri")
  );

const makeSelectError = () =>
  createSelector(
    selectImagePreviewDomain(),
    substate => substate.get("error")
  );

export { makeSelectLoading, makeSelectError, makeSelectImageDataUri };
