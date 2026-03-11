const { rules } = require("eslint-config-prettier");

module.exports = {
  env: {
    node: true,
    es2022: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {
    "no-console": "off",
  },
};
