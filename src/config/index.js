const environments = {
  development: {
    baseUrl: "",
  },
  staging: {
    baseUrl: "",
  },
  production: {
    baseUrl: "",
  },
};
const { TARGET_ENV = "development " } = process.env;

module.exports = environments[TARGET_ENV] || environments["development"];
