"use strict";

const findAuthenticatedRole = async () => {
  const result = await strapi
    .query("role", "users-permissions")
    .findOne({ type: "authenticated" });

  return result;
};

const setDefaultPermissions = async () => {
  const role = await findAuthenticatedRole();

  const permissions = await strapi
    .query("permission", "users-permissions")
    .find({ type: "image-formats", role: role.id });

  await Promise.all(
    permissions.map(p =>
      strapi
        .query("permission", "users-permissions")
        .update({ id: p.id }, { enabled: true })
    )
  );
};

const isFirstRun = async () => {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: "plugin",
    name: "image-formats"
  });

  const initHasRun = await pluginStore.get({ key: "initHasRun" });

  await pluginStore.set({ key: "initHasRun", value: true });

  return !initHasRun;
};

module.exports = async callback => {
  const shouldSetDefaultPermissions = await isFirstRun();

  if (shouldSetDefaultPermissions) {
    await setDefaultPermissions();
  }

  callback();
};
