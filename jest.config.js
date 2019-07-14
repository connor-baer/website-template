module.exports = {
  rootDir: '.',
  testPathIgnorePatterns: ['<rootDir>/.next/'],
  watchPathIgnorePatterns: ['<rootDir>/.next/'],
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
    '<rootDir>/jest.setup.js'
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.svg$': '<rootDir>/jest.fileTransform.js'
  },
  testEnvironmentOptions: {
    pretendToBeVisual: true
  },
  testURL: 'http://localhost:3000',
  moduleFileExtensions: ['js'],
  coverageDirectory: './__coverage__',
  coverageReporters: ['cobertura', 'text', 'html'],
  collectCoverageFrom: [
    '**/*.js',
    '!**/*.story.js',
    '!**/*.spec.js',
    '!**/__fixtures__/**',
    `!static/**`,
    '!.next/**'
  ]
};
