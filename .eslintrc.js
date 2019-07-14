const {
  react: baseConfig,
  overwritePresets
} = require('@sumup/foundry/eslint');

const customConfig = {
  globals: {
    objectFitPolyfill: true
  },
  rules: {
    'notice/notice': 'off',
    'react/prop-types': 'off',
    'emotion/jsx-import': 'off',
    'jsx-a11y/anchor-is-valid': 'off'
  }
};

module.exports = overwritePresets(baseConfig, customConfig);
