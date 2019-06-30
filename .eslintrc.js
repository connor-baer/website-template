const {
  react: baseConfig,
  overwritePresets
} = require('@sumup/foundry/eslint');

const customConfig = {
  globals: {
    objectFitPolyfill: true
  },
  rules: {
    'react/prop-types': 'off'
  }
};

module.exports = overwritePresets(baseConfig, customConfig);
