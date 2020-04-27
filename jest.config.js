module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  collectCoverage: true,
  collectCoverageFrom: ['src/components/**/*.vue', 'src/**/*.ts', '!**/node_modules/**'],

  // transform: { '^.+\\.ts?$': 'ts-jest' },
  // testEnvironment: 'node',
  // testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
