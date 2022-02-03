process.env.VUE_APP_VERSION = require("./package.json").version || "0.0.0";

module.exports = {
  transpileDependencies: ["vuetify"],
};
