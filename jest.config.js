module.exports = {
  moduleFileExtensions: ['js', 'ts', 'json'],
  testRegex: '(.*.(test|spec)).ts?$',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
}
