import pluginId from "pluginId";

const buildString = suffix => `${pluginId}/HomePage/${suffix}`;

export const LOAD_IMAGE_FORMATS = buildString("LOAD_IMAGE_FORMATS");
export const LOAD_IMAGE_FORMATS_ERROR = buildString(
  "LOAD_IMAGE_FORMATS_ERROR"
);
export const LOAD_IMAGE_FORMATS_SUCCESS = buildString(
  "LOAD_IMAGE_FORMATS_SUCCESS"
);

export const UNDO_IMPORT = buildString("UNDO_IMPORT");
export const UNDO_IMPORT_SUCCESS = buildString("UNDO_IMPORT_SUCCESS");
export const UNDO_IMPORT_ERROR = buildString("UNDO_IMPORT_ERROR");

export const DELETE_IMPORT = buildString("DELETE_IMPORT");
export const DELETE_IMPORT_SUCCESS = buildString("DELETE_IMPORT_SUCCESS");
export const DELETE_IMPORT_ERROR = buildString("DELETE_IMPORT_ERROR");
