import pluginId from "pluginId";

const buildString = suffix => `${pluginId}/ImageFormatPreview/${suffix}`;

export const FETCH_PREVIEW = buildString("FETCH_PREVIEW");
export const FETCH_PREVIEW_ERROR = buildString("FETCH_PREVIEW_ERROR");
export const FETCH_PREVIEW_SUCCESS = buildString("FETCH_PREVIEW_SUCCESS");
